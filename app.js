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

  
// Write code to use inquirer to gather information about the development team members:

        // Input employees and their information. This function will keep repeating until all employees have been added to the Array called TeamArray:
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

                    ]).then( 
                        answers => {

                            // Create code that creates a new employee object based off the employee class and pushes it to the teamArray.
                            if (answers.employeeClass == "Manager") {
                                const employee = new Manager(answers.employeeName, answers.employeeID, answers.employeeEmail, answers.officeNumber)
                                teamArray.push(employee)                           
                            } else if (answers.employeeClass == "Engineer") {
                                const employee = new Engineer(answers.employeeName, answers.employeeID, answers.employeeEmail, answers.github)
                                teamArray.push(employee)  
                            } else {
                                const employee = new Intern(answers.employeeName, answers.employeeID, answers.employeeEmail, answers.school)
                                teamArray.push(employee)
                            }

                            // This  code will make it so that the function inputEmployees() will repeat as long as the user still has employees to input into the roster.
                            if (answers.newEmployee) {
                                // Will use a concept called recursion where the function calls itself in an infinite loop until another condition is met:
                                inputEmployees();
                            } else {
                                // If no more employees need to be input, Render the Array that contains all the Team information into an HTML file:
                                callRender();
                            }
                        }   
                    );
            };

// Function to generate HTML from the Team Array after it has been populated by the employee data:
function callRender() {
        const renderHTML = render(teamArray);
        fs.writeFile(outputPath, renderHTML, (err)=>{
            console.log('file generated')
        })
}

// Initialize the inputEmployees function which will get the program running:
inputEmployees()
 
        




