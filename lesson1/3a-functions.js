function sum(a, b) {
  return a + b
}
console.log(sum(1, 2))  // 3


// default values
function sum(a, b = 5) {
  return a + b
}
console.log(sum(1))  // 6


// undefined
function strange(a, b = 5, c = 3) {
  return (a + b) * c
}
console.log(strange(1))                // 18
console.log(strange(1, 3, 2))          // 8
console.log(strange(1, undefined, 2))  // 12