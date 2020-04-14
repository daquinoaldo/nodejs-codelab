// Suppose this object comes from a db, and represent a user.
// You want to send it to your fronted, for example as response of the login API.
// You can't send the password, this would not be safe!
// You must create a copy of that object and remove the password.
let user = {
  name: "Aldo D'Aquino",
  username: "daquinoaldo",
  password: "thisIsSecret"
}

// Fine, copied, the two object are equal.
const safeUser = user
console.log("user =", user)  // hey cool, the comma , joins the strings adding automatically the space and print the object correctly
console.log("safeUser =", safeUser)

// Now let's delete the password from the safeUser.
// delete is used to unset properties of objects.
delete safeUser.password
// Fine, no more password, I can send it to the client.
console.log("Edit: safeUser =", safeUser)
// But... Oh now, I delete it from the old user too!
// Yes, this because user doesn't contain the object, but a pointer to the object.
// So, safeUser = user makes a copy... of the pointer!
// And when you edit the object pointed by safeUser you are editing the same object pointed by user.
console.log("Edit: user =", user)

// We need a deep copy!
// A deep copy doesn't copy the pointer, but creates a new object, equal to the old one, and put its pointer in the new variable.
// You will obtain two identical but distinct objects.

// Recreate the user, with its password field.
user = {
  name: "Aldo D'Aquino",
  username: "daquinoaldo",
  password: "thisIsSecret"
}

// Deep copy, the old way:
// Object.assign assigns all the properties of user to the empty object {} and returns the result object.
const safeUser2 = Object.assign({}, user)
delete safeUser2.password
console.log("user =", user)
console.log("safeUser2 =", safeUser2)

// Deep copy, the new way:
// This three dots ... are called spread operator. ...user represents all the properties in user. It actually "expands" user.
// So, safeUser3 is an object (there are graphs { ... }) that contains all the properties in user.
const safeUser3 = { ...user }
delete safeUser3.password
console.log("user =", user)
console.log("safeUser3 =", safeUser3)

// Pro-tip: both Object assign and the spread operator have some override mechanisms.
const overrideAssign = Object.assign({}, user, { password: undefined })
const overrideSpread = { ...user, password: undefined }
console.log("overrideAssign =", overrideAssign)
console.log("overrideSpread =", overrideSpread)


// We can use the spread operator for functions too.
function sum(a, b, c) {
  return a + b + c
}
// And we can spread also arrays.
const numbers = [1, 2, 3]
console.log("sum spread result =", sum(...numbers))
// The old way: it's equivalent, but it doesn't have the same sex appeal!
console.log("sum apply result =", sum.apply(null, numbers)) // null is the object on which apply the sum (we don't need it), the other are the parameters

// Pro-tip: merge two array fast.
const array1 = [1, 2, 3]
const array2 = [4, 5, 6]
console.log("merged array =", [...array1, ...array2])
// The order matters.
console.log("inverse merge =", [...array2, ...array1])



// Destructuring assignment: the opposite of spread.
const obj = {
  a: 1,
  b: 2
}
// We can rewrite this...
// const a = obj.a
// const b = obj.b
// ...in this.
const { a, b } = obj
console.log(`a = ${a}, b = ${b}`)

// Also partially:
const obj2 = {
  thisMatter: "Save me",
  thisNot: "Ignore me"
}
const { thisMatter } = obj2
console.log(`thisMatter = ${thisMatter}`)
// console.log(`thisNot = ${thisNot}`) // error: thisNot is not defined

// An can be used with the spread operator too: collect the remaining parts in an expanded object.
const obj3 = {
  something: "Keep me separately",
  all: "I go with the rest",
  the: "I go with all rest",
  rest: "I go with the all"
}
const { something, ...allTheRest } = obj3
console.log(`something = ${something}`)
console.log("allTheRest =", allTheRest)

// Of corse, arrays too.
const someNumbers = [-1, 0, 1, 2, 3]
const [minusOne, zero, ...positiveNumbers] = someNumbers
console.log(`minusOne = ${minusOne}`)
console.log(`zero = ${zero}`)
console.log("positiveNumbers =", positiveNumbers)



// Pro-tip: now, let's obtain safeUser even faster!
const { password, ...theSafeUser } = user
console.log("theSafeUser =", theSafeUser)