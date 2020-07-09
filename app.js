// Set up this program by calling in all the required modules, functions, templates, and building required arrays

   // Call in node modules:
    const inquirer = require("inquirer");
    const path = require("path");
    const fs = require("fs");

    // Call in employee templates created on separate JS sheets:
    const Manager = require("./lib/Manager");
    const Engineer = require("./lib/Engineer");
    const Intern = require("./lib/Intern");

    // Constant for the save directory of the team template:
    const OUTPUT_DIR = path.resolve(__dirname, "output");
    const outputPath = path.join(OUTPUT_DIR, "team.html");

    // Call in functions to render HTML file:
    const render = require("./lib/htmlRenderer");

    // Create empty array in which to push team member data:
    const teamArray = [];


// Function to generate HTML from the Team Array after it has been populated by the employee data:
function callRender() {
    // the render function is from a separate JS sheet named htmlRenderer
    const renderHTML = render(teamArray);

    fs.writeFile(outputPath, renderHTML, (err)=>{
        console.log('file generated')
    })
}
 
// Write code to use inquirer to gather information about team members. This code creates a prompt where user can input information about the employees on the team. 
// The team member information will be pushed into an empty array called teamArray. 
// Once all the team members have been added to the array, the array will then be used in the callRender() function to generate the HTML containing a graphical representation of team members.

function inputEmployees() {
        return inquirer.prompt(
            [
                {
                    type: "list",
                    name: "employeeClass",
                    message: "What is the employee's role on the team?",
                    choices: [
                        "Manager",
                        "Engineer",
                        "Intern"
                    ] 
                },
                {
                    type: "input",
                    name: "employeeName",
                    message: "What is the name of the employee?"
                },
                {
                    type: "input",
                    name: "employeeID",
                    message: "What is the ID Number of the employee?"
                },
                {
                    type: "input",
                    name: "employeeEmail",
                    message: "What is the email address of the employee?"
                },
                {
                    type: "input",
                    name: "officeNumber",
                    message: "What is the manager's office number?",
                    when: (userInput) => userInput.employeeClass == "Manager"
                },
                {
                    type: "input",
                    name: "github",
                    message: "What is this Engineer's Github username?",
                    when: (userInput) => userInput.employeeClass == "Engineer"
                },
                {
                    type: "input",
                    name: "school",
                    message: "What school is this intern attending?",
                    when: (userInput) => userInput.employeeClass == "Intern"
                },
                {
                    type: "confirm",
                    name: "newEmployee",
                    message: "Would you like to add another employee to the roster?"
                }

            ])
            .then( 
                answers => {

                    // Create code that creates a new employee object based off the employee class and pushes it to the teamArray.
                    switch(answers.employeeClass){

                        case "Manager" :
                            teamArray.push(new Manager(answers.employeeName, answers.employeeID, answers.employeeEmail, answers.officeNumber));
                            break;

                        case "Engineer" :
                            teamArray.push(new Engineer(answers.employeeName, answers.employeeID, answers.employeeEmail, answers.github));
                            break;
                        
                        case "Intern" : 
                            teamArray.push(new Intern(answers.employeeName, answers.employeeID, answers.employeeEmail, answers.school));
                            break;
                        
                    };
                   
                    // This  code will make it so that the function inputEmployees() will repeat as long as the user still has employees to input into the roster.
                    switch(answers.newEmployee){

                        case true :
                            // Will use a concept called recursion where the function calls itself in an infinite loop until another condition is met:
                            inputEmployees();
                            break;
                        
                        default : 
                            // If no more employees need to be input, render the Array that contains all the Team information into an HTML file:
                            callRender()

                    };

                });   
            
};

// Initialize the function to input employees which will get the program running:
inputEmployees()
 
        




