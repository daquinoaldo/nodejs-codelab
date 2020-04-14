// IO operations, like read files or exchange data on the network, are slow operations.
// For that reason, it's important to do it asynchronously, without suspending the thread on this computation.
// The old way to do that are the callbacks.
function doSomeIOWithCallback(callback) {
  // do some IO
  const err = { /* the error occurred during the IO, or null */ }
  const data = { /* the IO result */ }
  callback(err, data)
}

// Today we use async function and promises.

// Async function
async function doSomeIOAsync() {
  // do some IO
  const err = { /* the error occurred during the IO, or null */ }
  const data = { /* the IO result */ }
  if (err) throw err  // we raise an exceptions, is similar to Java's exceptions
  return data         // we return the data directly, the function is async for its declaration
}

// Promise
function doSomeIOWithPromise() {
  // This is what declaring a function async produce!
  return new Promise((resolve, reject) => {
    // do some IO
    const data = { /* the IO result */ }
    const err = { /* the error occurred during the IO, or null */ }
    if (err) reject(err)  // corresponds to throw err
    resolve(data)         // corresponds to return data
  })
}

// How to handle promises?

// Option 1: await
// If it's a good idea to do huge IO operation asynchronously, why should you await them then?
// Because, eventually, you may need this data to go on on your workflow. Later it is, better it is.
// You can await only in async functions. In this way node forces you to not wait synchronously.
async function doSomethingAfterIO() {
  const IOAsyncData = await doSomeIOAsync()
    // catch is used to catch errors in promises.
    .catch(err => { /* do something with the error */ })
    // It is different from the try-catch:
    /*
    try {
      // do something
    } catch(e) {
      // handle e
    }
    */
  const data = { /* do something with IOAsyncData */ }
  return data
}

// You cannot await in the main, the following line will cause exception!
// const data = await doSomeIOAsync()
// There is the possibility this action will became possible in the next JS versions:
// there is a stage-3 proposal that may soon reach the stage 4 and became available.
// If you are curious, you can find it here: https://github.com/tc39/proposal-top-level-await.
// Anyway, the fact that for the moment is not possible should be a hint to remember you how it is a bad practice.


// Option 2: then
// The then has the same mechanism of the callback.
// It is useful to simplify doSomethingAfterIO.
doSomeIOAsync()
  // The then takes a callback (a lambda in this case)
  // The callback should take the result of the resolved promise
  // (i.e. what is passed to the resolve, or what is returned in an async function)
  // and should return something.
  // The result of the then is a promise resolved with the result of the then.
  .then(data => { /* do something with IOAsyncData */ })

// They can be combined!
const finalResult = await doSomeIOAsync()
  .catch(err => console.log("Got error in the IO operation"))
  // Note that we are awaiting for the "do something cool" operation,
  // not for the "doSomeIOAsync()".
  // "do something with IOAsyncData" is waiting for "doSomeIOAsync()"
  // "do something else" is waiting for "do something with IOAsyncData"
  // "do something cool" is waiting for "do something else"
  // (As usual, comments doesn't break the work flow)
  .then(data => { /* do something with IOAsyncData */ })
  .then(data => { /* do something else */ })
  .then(data => { /* do something cool */ })
  // You can mix and match then and catch.
  // A catch catches all the reject and throws that came before it.
  // This catch catches all the promises for example,
  // but not the doSomeIOAsync(), because it is already caught by the first catch.
  .catch(err => console.log("Got error in processing the data"))