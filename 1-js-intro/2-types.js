/* LET vs CONST */
let a = 0
console.log(a)
a++ // equivalent to "a = a + 1" and "a += 1"
console.log(a)

const b = 0
//b++ // produces error

// always use const, unless you need a let
// this will prevent unwanted overrides of the value


/* ARRAY */
const array = [1, 2, 3]
console.log(array)

// replace a value in the array
// wait a minute: isn't it a const?
// yep, const means you can't change the value of the var "array", that is *that* array
// ...but you can change what that array contains
array[1] = 4
console.log(array)

// add elements to array
array.push("string") // whaaaat? yep, arrays are heterogeneous: "Do what you want 'cause a pirate is free, you are a pirate!" (https://youtu.be/IBH4g_ua5es)
console.log(array)

// remove elements from array
const last = array.pop() // removes and returns the last element (it's a LIFO stack: Last In First Out, opposite to the FIFO that is a queue)
const secondLast = array.pop()
console.log(last)
console.log(secondLast)
console.log(array)


// other methods coming soon (in the next lessons):
// map, slice, reduce, foreach, ...


/* OBJECT */
const obj = {
  key1: "value1",
  key2: "value2",
  intToo: 1,  // notice the camelCase
  andArrays: [1, "a"]
}
console.log(obj)

/* common case stiles:
- camelCase   <-- use this in JS
- PascalCase
- snake_case
- kebab-case
*/


console.table(["Hello", "world"])
console.table({ hello: "world" })