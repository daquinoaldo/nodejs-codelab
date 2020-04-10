/* WHILE */
let even = 0
while(even < 10) {
  console.log(even)
  even +=2
}
// nothing special
// it prints all the even numbers lower than 10 (excluded)
console.log()  // print empty line, just to make logs more readable

// as for the if, if has only one command in the body, brackets are not mandatory (but really, which while has just a command?)
let num = 0
while(num < 3)
  // increment num then log it. num++ instead will print the num and then increment
  // try with console.log(num++) to get 0, 1, 2 instead of 1, 2, 3
  // oh, I almost forgot: comments are not commands, so that while has actually only one row in the body
  console.log(++num) 
  console.log() // that's outside the while, even if indented as the previous row
// actually the indentation is wrong, put it back where it should be placed please
// programmers are such autistic people for things like that: alway write a clean, tidy, well formatted and properly commented code



/* DO WHILE */
// The same of the while, but do the body at least one time. Sometimes is useful.
let success = false
do {
  success = Math.random() < 0.3 // true if the random number (from 0 to 1) is less than 0.3
  if (success) console.log("We did!")
  else console.log("Nope, retrying...")
} while(!success)



/* FOR */
for (let i = 0; i < 5; ++i) {  // standard for; the one we all know
  console.log(i)  // 0, 1, 2, 3, 4: what? I put a ++i! Yep, but the last command (++i) is executed after the body, so nothing changes between ++i and i++
}
console.log() // again, just to keep things separated

const array = ["a", "b", "c"]
for (let i = 0; i < array.length; i++) // of course, without parenthesis too
  console.log(array[i])
console.log() // separator

// aha, that's the for each! it will print a, b, c
for (let i in array)
  console.log(i)
// nope, it's a for loop, as the previous one: the "in array" finds the keys, that are the indexes of the array, not the values in that position
console.log()

// this is the for each
for (let val of array) {
  console.log(val)
}
console.log()


// BONUS
for (let i = 0; i <= array.length; i++)
  // "Aha gotcha! You should not place that = after the <. Arrays positions goes from 0 to length-1. Something bad will happen."
  // * A ghost of a C programmer is whispering "segfault: core dump" *

  // Oh, really? Explain that to JS... tsk, newbie!
  console.log(array[i])
  // Remember: JS never crashes. Never.
  // It's like a Witcher: https://media1.tenor.com/images/d183d50e4e010330fda07975a2ea139a/tenor.gif