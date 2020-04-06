// System libraries first, than external ones, and/or alphabetically sorted.
const fs = require('fs')
const express = require('express')

const userdbPath = "users.json"
const port = 3000

const app = express()


async function getUsers() {
  // This function returns a Promise!
  return new Promise((resolve, reject) => {
    // (err, buffer) => { ... } is a lambda
    fs.readFile(userdbPath, (err, buffer) => {
      // Err is set in case of error, in promises we reject with the error.
      if (err) reject(err)
      // If there aren't errors, we can resolve the promise with the data.
      // Before resolving, we parse the json as a JS object.
      resolve(JSON.parse(buffer))
    })
  })
}

// This function is async, even without the async!
// That's not totally exact. This function is sync, but returns a promise too.
// This because getUsers return a promise, the then return a promise, and we return the result of the then.
// If you return a promise, the async is not needed. Anyway, sometimes is useful to put it for clarity.
// Try to remove the async from getUsers and it will continue to work anyway.
function getUser(username) {
  return getUsers()
    // keep in the array only objects with our username
    // (i.e. an array with the exact user or an empty array if the username is wrong)
    .then(users => users.filter(user => user.username === username))
    // now extract the user from the array, or null if the array is empty
    // (remember the ternary operator? and the fact that numbers != 0 are true?)
    .then(users => users.length ? users[0] : null)
}
// Note: it's stupid to filter an array, possibly huge,
// it would be better to have an object like this:
/*
{
  daquinoaldo: { name: "Aldo", surname: "D'Aquino", username: "daquinoaldo" },
  username2: { name: ... }
}
*/
// In this case we could access directly to the user by its username.
// Anyway, also having an object inside a file is stupid, and a proper db, e.g. Mongo, should be used instead.
// At least, this example shows how filter works, and that's the reason of this dumb example.
// Don't do it in your app. Really. Don't. Do it.
// This is the documentation for mongo on nodejs: https://mongodb.github.io/node-mongodb-native.
// We may see it in the next lessons.



// Let's get the username from the url path as parameter.
// If you put a colon : after a slash / in the url, that thing will not be a fixed string but is a parameter.
// The parameters can be found in the request: req.params is an object that contains all the parameters.
app.get('/user/:username', async (req, res) => res.json(await getUser(req.params.username)))
// Hey, look, lambdas can be async too!
// The server will not suspend on the getUser, but will respond with a json when the promise is resolved.



// What if something went wrong?
app.get("/do-something-dumb", (req, res) => res.json({ result: undefinedObject.result }))
// Ugh! We printed the whole error stack to the user! And it's not even a json! Sorry client library, this will hurt badly.

// We need an error handler!
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).json({ error: "Internal server error." })
})


// Just keep the 404 handler.
// This is different from the error handler: this wil collect all the requests to non-existing urls (users' fault),
// error handler will catch and handle all the server error (our fault).
app.get("*", (req, res) => res.status(404).json({ error: "Page not found" }))


app.listen(port, () => console.log(`Server listening at http://localhost:${port}`))