// just an array of users
const users = [
  {
    username: "daquinoaldo",
    password: "wdH(d*?L3+Fc",
    postNumber: 23
  },
  {
    username: "supermario",
    password: "Toad123",
    postNumber: 3
  },
  {
    username: "h4ck3r",
    password: "P4$$W0rD",
    postNumber: 16
  }
]

// Map returns an array where each element of users is replaced with the result of the lambda.
// This lambda, taken an user return the username.
const usernames = users.map(user => user.username)
console.log("usernames =", usernames)

// Filter returns and array with the only elements that satisfy a condition,
// i.e. the ones for which the lambda returns true.
// This lambda returns true if the password is at least 8 characters long.
const strongPasswordUsers = users.filter(user => user.password.length >= 8)
console.log("strongPasswordUsers =", strongPasswordUsers)

// Reduce collapse an array into a single value. It takes a lambda and the initial accumulator (0).
// It's lambda takes an accumulator (number) and the current element (user)
// and return a value that is the new value of the accumulator.
// At the end, the reduce returns the accumulator.
// If omitted, the accumulator is the first object.
const totalPostNumber = users.reduce((number, user) => number + user.postNumber, 0)
console.log("totalPostNumber =", totalPostNumber)