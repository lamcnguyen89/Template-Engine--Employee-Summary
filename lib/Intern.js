const Employee = require("./Employee")


// We create the subclass Intern which is an extension of the Employee class.
class Intern extends Employee {

    constructor(name, id, email, school) {
        super(name, id, email);
        this.school = school;
    };

    //Returns the Intern's school:
    getSchool() {
        return this.school;
    };

    //Overrides the Employee role with the Intern role:
    getRole() {
        return "Intern"
    };

}

module.exports = Intern