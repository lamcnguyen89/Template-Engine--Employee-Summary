const Employee = require("./Employee")


// We create the subclass Manager which is an extension of the Employee class.
class Manager extends Employee {

    constructor(name, id, email, officeNumber) {
        super(name, id, email);
        this.officeNumber = officeNumber;
    };

    //Returns the manager's office number:
    getofficeNumber() {
        return this.officeNumber;
    };

    //Overrides the Employee role with the Manager role:
    getRole() {
        return "Manager"
    };

}

module.exports = Manager