// Express is a third party library, in Node.js it's a common practice to rely on external libraries.
// npm is the Node Package Manager, it comes preinstalled with node and allows to download and install
// libraries from npmjs.com, the npm Registry, that contains all the published packages.
// It's an institution for Node.js programmer. Anyone can publish a package on npm (including me:
// npmjs.com/package/https-localhost) to make it available to everyone.
// Express.js is the most most used and unopinionated web framework for Node.js, and comes from the same creators!

// Why do we need a framework?
// Remember the hello-json-routes example of the lesson1? It was such a mess! And it was a really simple example.
// Express integrates many facilities for webservers, that we will see in this lesson.

// Must be installed! Run: "npm install express" (or simply "npm i express").
const express = require('express')

// Create an express instance, equivalent to const server = http.createServer()
const app = express()
const port = 3000

// That's a route: you can compare it with the createServer callback, even if it is not exactly the same thing.
// - get means that will handle the GET requests on "/", the first parameter
// - res.send is like res.end in the http server, but it sets the statusCode to 200 by default
app.get('/', (req, res) => res.send('Hello World!'))

// It maintains the same syntax of server.listen
app.listen(port, () => console.log(`Server listening at http://localhost:${port}`))




/* PREVIOUS EXAMPLE WITH PLAIN HTTP:
const http = require('http')

const port = 3000

const server = http.createServer((req, res) => {
  res.statusCode = 200 
  res.end("Hello world")
})

server.listen(port, () => console.info(`Server listening at http://localhost:${port}`))
*/