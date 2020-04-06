// This is how we import libraries in javascript.
// It's an object, so it must assign it to a variable to use it.
const http = require('http')

// The port of the server. In that case we will can interact with it on http://localhost:3000.
// The default ports are 80 for http and 443 for https, but usually API servers are assigned to different ports to avoid conflicts with the frontend.
const port = 3000


// The http library (that is an object) contains a method createServer, that returns an http server.
// This function wants a callback as parameter. In that case we used a lambda: (req, res) => { ... }.
// The callback should be a function that takes two parameters: the request (req) and the response (res).
// req is what comes from the browser. It contains the url of the request, the query parameter, the body, the headers, and so on.
// res is an object prepared for us by the server. It contains utilities to reply to the browser that sent the request.
const server = http.createServer((req, res) => {
  res.statusCode = 200    // This returns a "200 OK" status, is the default one. Others are 404 (not found), 301 (redirect)...
  res.end("Hello world")  // This ends the request handling by sending the string to the browser as body of the response. We will see "Hello world" in the page.
})


// server has a function listen that starts the server. It takes as argument a port and (optionally) a callback.
// The callback is a lambda without parameters: () => console.info("...").
// Remember that console has not only log? info is a bit more relevant than log.
// error should be used for bad errors and warn for something important, to be noticed, but not tragic.
// debug is for redundant things. That will allow us (in the future) to filter the console messages by severity.
server.listen(port, () => console.info(`Server running at http://localhost:${port}`))
