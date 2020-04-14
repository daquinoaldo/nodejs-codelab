// Import a class from another file
const User = require ('./4-class')

// Allocate a new user
const user = new User("Aldo", "D'Aquino", 24)
user.sayHi()

user.setAge(undefined)
user.sayHi()




// Okay, let's understand this private fields!

// Let's print the user: age and customMessage are the only public fields
// so we get an object containing only this two properties.
// Object's method are not printed.
console.log(user)

// We can access the age
console.log(`user.age = ${user.age}`)
console.log(`user.["age"] = ${user["age"]}`)  // TA-DA! Objects and arrays are so similar...

// We can change the age either directly...
user.age++
console.log(`user.age incremented = ${user.age}`)

// ...or with getter and setter.
user.setAge(user.getAge() - 1)
console.log(`user.age decremented = ${user.age}`)

// But we can't access private fields directly.
console.log(user.name)   // undefined
//console.log(user.#name)  // error
//user.#name = "Jack"      // error
console.log(user["#name"]) // WTF undefined? Damn it, JS!

// Anyway, we can still get the name with the getter
console.log(user.getName())
// But since there is no setter, we can't change the user's name.

// But what if...
user["#name"] = "Jack"
console.log(user.getName()) // ...nope!

// And neither with a setter added from outside of the class
//user.setName = name => this.#name = name  // error

// Moreover, this "this" is not that "this".
user.getAge2 = () => this.age
console.log(`user.getAge2() = ${user.getAge2()}`)  // undefined



// Previously (and going deeper): read-only values
const obj = {};
Object.defineProperty(obj, "readOnly", {
    value: "can't change me",
    writable: false,
})
console.log(`obj.readOnly = ${obj.readOnly}`)
obj.readOnly = "sure?"
console.log(`obj.readOnly = ${obj.readOnly}`) // ...yep. Sure.

// getter and setter
Object.defineProperty(obj, "readOnly2", {
  get: () => "can't change me neither", // function that returns this value
  set: v  => undefined                  // TA-DA! Do nothing
})
console.log(`obj.readOnly2 = ${obj.readOnly2}`)
obj.readOnly2 = "sure?"
console.log(`obj.readOnly2 = ${obj.readOnly2}`) // ...yep. Sure.

// totally private
Object.defineProperty(obj, "private", {
  get: () => { throw new SyntaxError("Private field 'private' must be declared in an enclosing class") },
  set: v  => { throw new SyntaxError("Private field 'private' must be declared in an enclosing class") }
})

// And here we go!
//console.log(obj.private)  // error
//obj.private = "value"     // error
// Of course there is other code to make the private field visible inside the class, but this is the idea.