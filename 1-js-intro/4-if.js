/* HOW IF WORKS */
function checkResult(result) {

  const correctResult = 42
  if (result == correctResult) {
    console.log(`Right! ${result} is the answer to the ultimate question of life, the universe, and everything.`)
  } else {
    console.log(`Whaaaaaat?? ${result}, really? Please, consider reading "The Hitchhiker's Guide to the Galaxy" books guy!`)
  }

}
checkResult(42)
checkResult(24)

// parenthesis are not necessary: this is the same
/*
if (result == correctResult)
  console.log(`Right! ${correctResult} is the answer to the ultimate question of life, the universe, and everything.`)
else console.log(`The result ${result} is wrong.`)
*/

// Mmh... what would that print?
checkResult("42") // "Right!"
// Actually, that is fine. The result is correct, independently from its type.
// That work as expected too, so it's okay!
checkResult("24")
// How it is possible? 42 is a number and "42" a string, so it cast 42 to a string and then "42" == "42". Make sense.

// But what if...
function successor(num) {
  return num + 1
}
console.log(successor(42))    // 43
console.log(successor("42"))  // 421, because "42" + 1 becomes "42" + "1" that is string concatenation!

// What if it should really check for a number?
function checkResult(result) {
  const correctResult = 42
  if (result === correctResult)
    console.log(`That's exactly ${correctResult}.`)
  else console.log(`${result} is not strictly equal to ${correctResult}.`)
}
checkResult(42)
checkResult("42")  // what a weird output!




/* LOGICAL OPERATORS */
function logicalAnd(a, b) {
  // both a and b should be true
  if (a && b) console.log(true)
  else console.log(false)
}
function logicalOr(a, b) {
  // either a or b should be true
  if (a || b) console.log(true)
  else console.log(false)
}
// just play a bit by yourself
logicalAnd(true, false)
logicalOr(true, false)

// in JS everything can be boolean (screw types!)
if (42) console.log("Numbers are true"); else console.log("Numbers are false") // aha! I can use semicolon to separate things that should stay on different lines!
if ("I'm a something, so I'm true") console.log("Strings are true"); else console.log("Strings are false")
if ([1,2,3]) console.log("Arrays are true"); else console.log("Arrays are false")
if ([]) console.log("Empty arrays are true"); else console.log("Empty arrays are false")  // mmh, you could have done better mr. JS, I'm a bit disappointed
if (null) console.log("Null is true"); else console.log("Null is false")  // of course, that's actually one of the best things of JS!

// so we can obtain something like...
function printFirst(array) {
  if (array && array.length)  // remember that line, we will talk about soon
    console.log("First element is: " + array[0])          // remember: sum between strings is a strings concatenation
  else console.log('Impossible to print the first item')  // btw, strings are fine also between apex: 'string' == "string"
}
printFirst([1, 2, 3])
printFirst([])
printFirst()

// logical operators are lazy in JS
// remember that "if (array && array.length)"?
// let's see another example
function unsafePrintFirst(array) {
  if (array.length) console.log("First element is: " + array[0])
  else console.log('Impossible to print the first item')
}
unsafePrintFirst([1, 2, 3])  // that's okay
unsafePrintFirst([])         // that's okay too
//unsafePrintFirst()           // oh no!
// If array is undefined I cannot access to its property length, since undefined doesn't have a property length
// but in "array && array.length" if array has a falsy value, like undefined, the expression evaluation ends.
// JS is lazy, so if it will found false && something it will be false independently from something, so there is no reason to evaluate something.
// That's why the array.length part doesn't raise exception: it won't be evaluated if array is falsy.
// That is the same, but reversed, for the or: if (true || whatever) doesn't evaluate whatever because the result is already true.




/* ASSIGNMENTS AND TERNARY OPERATORS */
let config = {
  port: 8080 // comment me to hide me, in the following way:
  //port: 8080
}

// this is the canonical version, but is not so readable and it's a bit long...
let port = 80
if (config && config.port) // try to comment the port inside config
  port = config.port
console.log(port)

// but hey, saw that "something" is true, and null or undefined is false, so it is possible to do something like that:
port = config.port || 80
console.log(port)

// wow magic, but what if config is undefined?
config = null
//port = config.port || 80  // ouch!



// ternary operator
port = config ? config.port : 80  // ? stands for if and : for else. The else is mandatory, you can't omit the colon (otherwise is not ternary!)
console.log(port)

// okay, all together now!
port = config ? (config.port || 80) : 80  // parenthesis are for clarity, but not mandatory
console.log(port) // just experiment in settings things to null or undefined, or to remove from the scope



// remember that: this is okay
let config1 // config1 === undefined
port = config1 ? config1.port : 80

// this is not okay
//port = config2 ? config2.port : 80
// config2 is not declared, and you can't use undeclared variables because they don't exist!

// instead this is fine
function getPort(config) { // config is declared because it's a parameter: if not passed is equal to undefined, but the variable name exists
  return config ? config.port : 80
}
console.log(getPort())
