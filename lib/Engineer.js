const Employee = require("./Employee")


// We create the subclass Engineer which is an extension of the Employee class.
class Engineer extends Employee {

    constructor(name, id, email, github) {
        super(name, id, email);
        this.github = github;
    };

    //Returns Github username:
    getGithub() {
        return this.github;
    };

    //Overrides the Employee role with the Engineer role:
    getRole() {
        return "Engineer"
    };

}

module.exports = Engineer