// To understand a class we can refer to objects:
// a class instance is an object, with inside variables (properties or fields) and functions (methods).
// A class is a "factory" of similar objects: "const myUser = new User()" create a new user object, with the schema of the class User.
// Multiple calls of "new User()" creates many users, all equals, but distinct objects (like a deep copy).
class User {

  // This a are fields: inside a class variables doesn't want the let.
  customMessage = "I'm a user."
  // Fields that are initialized in the constructor can be omitted.
  //age
  // Fields starting with # are private fields. They cannot be accessed from outside the object.
  // We will see better later.
  // Anyway, private fields must be declared.
  #name
  #surname

  // CONSTRUCTOR
  // A class has a constructor, that is invoked when we do a "new User()".
  // If the constructor doesn't need arguments and doesn't have a body
  // (i.e. "constructor() { }" ), it can be omitted.
  constructor(name, surname, age = null) {
    // This is a pointer to the current object, that is not the class,
    // but the instance of the object, allocated with the new.
    // This means, that "new User()" will return a user object
    // in which the id, name, surname and age properties are set
    // with the constructor parameters.
    this.#name = name
    this.#surname = surname
    this.age = age
  }

  // GETTER
  // Getters are used to get information from the object.
  // Them are functions, but inside a class functions don't want the "function" keyword.
  // Getters start with get for convention reasons, and of course, return values.
  getName()     { return this.#name }
  getSurname()  { return this.#surname }
  getFullName() { return `${this.#name} ${this.#surname}` }
  getAge()      { return this.age }

  // SETTER
  // Set are used to set fields in the object. Like getters, setters start with set for convention reasons.
  setAge(age) { this.age = age }

  // Other methods
  addSpokenLanguage(language) {
    this.spokenLanguages.push(language)
  }

  // private function, but only as lambda
  #spokenLanguagesMessage = () => {
    // no spoken language, return empty message
    if (this.spokenLanguages.length == 0) return ""
    // one language, return this one
    if (this.spokenLanguages.length == 1) return " and I speak " + this.spokenLanguages[0]
    // do a deep copy
    const languages = [...this.spokenLanguages]
    // separate the last language (undefined if otherLanguages is an empty array) from the others
    const lastLanguage = languages.pop()
    // the message is the all the languages separated by a comma, except for the last that is separated with an and
    return " and I speak " + languages.join(", ") + (lastLanguage ? ` and ${lastLanguage}` : "")
  }

  // sayHi() {
  //   const slm = this.#spokenLanguagesMessage()
  //   // if not this.age empty string
  //   // else if slm use the comma, otherwise put the and
  //   // in both cases add "I'm this.age"
  //   const ageMessage = this.age ? (slm ? ", " : " and ") + `I'm ${this.age}` : ""
  //   console.info(`Hi! I'm ${this.getFullName()}${ageMessage}${slm}.`)
  // }

  sayHi() {
    // if not this.age empty string
    const ageMessage = this.age ? ` and I'm ${this.age}` : ""
    console.info(`Hi! I'm ${this.getFullName()}${ageMessage}. ${this.customMessage}`)
  }
}

// This is how users can be allocated.
const user = new User("Aldo", "D'Aquino", 24)

// Export the class to use it in other files
module.exports = User