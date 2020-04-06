// canonical function
function sum1(a, b = 5) {
  return a + b
}

// functions can be assigned to variable!
const sum2 = sum1

// anonymous function (can be assigned too)
const sum3 = function (a, b = 5) {
  return a + b
}

// lambda (function) or arrow function (because of the =>)
const sum4 = (a, b = 5) => {
  return a + b
}

// inline lambda / arrow function
sum5 = (a, b = 5) => a + b

// the result is always the same
console.log(sum1(1, 2))
console.log(sum2(1, 2))
console.log(sum3(1, 2))
console.log(sum4(1, 2))
console.log(sum5(1, 2))

// Confusing? Probably. But that behavior opens lot of opportunities!

// Opportunity 1: lambda as callback
function longAsyncOperation(callback) {
  // do a huge async task
  // ...
  // invoke the callback to notify that I have finished
  callback()
}
longAsyncOperation(() => console.log("Done!"))
// instead of
/*
function longAsyncOperationCallback() {
  console.log("Done!")
}
longAsyncOperation(longAsyncOperationCallback)
*/
// That is THE LIFE. REALLY. You will appreciate more when we'll see promises and array.map

// Opportunity 2: functions generators (functions that returns functions)
function callbackGenerator(message) {
  return function () {
    console.log(message)
  }
}
longAsyncOperation(callbackGenerator("I've done!"))
longAsyncOperation(callbackGenerator("Me too!"))
const callback = callbackGenerator("Hey, I'm a callback!")

// Opportunity 3: shortcuts
const myLib = {
  // we will see how to import libraries soon, but for now it's enough to know that they are object
  // just suppose there is one that, among other thing, has this function in some place
  utilities: [
    {
      generators: {
        callbackGenerators: {
          loggingCallbackGenerators: {
            logSimpleMessage: message => () => console.log(message)
          }
        }
      }
    }
  ]
}
// it seems strange, but it's not so strange
const callback1 = myLib.utilities[0].generators.callbackGenerators.loggingCallbackGenerators.logSimpleMessage("How long is it?")
const callback2 = myLib.utilities[0].generators.callbackGenerators.loggingCallbackGenerators.logSimpleMessage("Should I write that every time?")
const generator = myLib.utilities[0].generators.callbackGenerators.loggingCallbackGenerators.logSimpleMessage
const callback3 = generator("Probably not")
const callback4 = generator("Oh, that's easier!")
callback4() // also callback1(), callback2(), ... they are functions