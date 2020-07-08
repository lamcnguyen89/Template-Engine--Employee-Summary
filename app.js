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

        // Create the Team Name:
            function teamTitle() {
                return inquirer.prompt([
                    {
                        type: "input",
                        name: "myTeam",
                        message: "What is the name of your team?"
                    }
                ]);
            };

        // Now input employees and their information. This function will keep repeating until all employees have been added to the Array called TeamArray:
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

                    ]);
                
                
            };


// function to initialize program
async function init() {
    try {
        //Initialize function to create an employee:
        const employeeObject = await inputEmployees();
        const teamName = await teamTitle();
        
    } 
    catch(err) {
        console.log(err);
    }
}

// function call to initialize program
init();

 
        




// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.



// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
