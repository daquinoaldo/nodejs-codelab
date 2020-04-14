// Import the User class
const User = require ('./4-class')

// Extend the User class, with a subclass
class Student extends User {

  constructor(name, surname, school, age = null) {
    // super is the super class.
    // In particular super() calls the superclass constructor.
    super(name, surname, age)
    this.school = school
    // Override the custom message
    this.customMessage = "I'm a Student."
  }

  // Additional methods
  getSchool() { return this.school }
  changeSchool(newSchool) { this.school = newSchool }

  // Override a method
  getFullName() {
    return "dr. " + super.getFullName()
  }
}

const student = new Student("Aldo", "D'Aquino", "Pisa University", 24)
student.sayHi()

// I can still access the superclass method, them are inherited.
console.log(`student.getName() = ${student.getName()}`)