// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require('./Employee.js')

// const n1 = new Employee('khoi', '2', 'ks')
class Manager extends Employee{
    constructor(name,id,email,officeNumber){
        super(name,id, email)
        this.officeNumber = officeNumber
    }

    getOfficeNumber(){
        return this.officeNumber
    }

    getRole(){
        return 'Manager'
    }
}

// let khoi = new Manager('Kho')

module.exports = Manager