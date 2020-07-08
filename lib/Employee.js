// We define the Employee Class from which the subclasses: Manager, Engineer, and Intern will be derived from:

class Employee {
    // Build the employee constructor which will allow quick creation and addition of new employees to the team roster:
    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;

        if(!name) {
            throw new Error("You are missing the employee's name.")
        }
        if(!id) {
            throw new Error("You are missing the employee's ID.")
        }
        if(!email) {
            throw new Error("You are missing the employee's email.")
        }
        
    }

    // Create a method get the employee name:
    getName() {
        return this.name;
    };

    // Create a method to get the employee ID:
    getId() {
        return this.id;
    };

    // Create a method to get the employee email:
    getEmail() {
        return this.email; 
    };

    // Create a method to get the employee role:
    getRole() {
        return "Employee";

    };
};

module.exports = Employee

