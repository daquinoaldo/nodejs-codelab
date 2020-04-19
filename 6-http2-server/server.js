// The http2 connection adopt a technique called server push.
// When the client ask for a resource, e.g. index.html,
// the server pushes also all the resources needed by index.html under the same connection.
// When the client parses index.html doesn't need to open new requests for the needed content,
// it will find all the resources already downloaded, ready to be parsed.
const fs = require('fs')
const http2 = require('http2')
const mime = require('mime')

const port = 3000

// Certificates for https connection.
// You can generate them with mkcert.dev. Install it and run: "mkcert localhost".
const options = {
  key: fs.readFileSync("localhost-key.pem"),
  cert: fs.readFileSync("localhost.pem")
}

// Even if http2 has also the createServer method (the same of the http module),
// browsers support only secure http2 connection, se we have to use createSecureServer (the same of the https module).
const server = http2.createSecureServer(options, (req, res) => {
  // If root is require, than we want the index.html file
  // Otherwise, the path is right
  const path = req.url === '/' ? `${__dirname}/index.html` : `${__dirname}${req.url}`

  // Respond with 404 if the file doesn't exist
  if (!fs.existsSync(path)) {
    res.statusCode = 404
    res.end(`${req.url} not found.`)
    return
  }

  // Get the file descriptor (it isn't readFileSync)
  const content = fs.openSync(path, 'r')

  // Get the mime type, to inform the client of the file type
  const headers = { "Content-type": mime.getType(path) }
 
  // If index.html is required, push also style.css
  if (path === '/index.html') push(res.stream, '/style.css')
 
  // Respond with the required file
  res.stream.respondWithFD(content, headers)
})


// An http2 server can accept the same handler of the http and https server.
// Anyway, to have a server push, we need a different handler, based on stream.
// Here is a simple example, that respond with our usual "Hello world".
// server.on("stream", (stream, headers) => {
//   stream.respond({
//     "Content-type": "text/html",
//     ":status": 200
//   })
//   stream.write('<style>@font-face { font-family: roboto src: url("roboto-thin.ttf") }</style>')
//   stream.end('<h1 style="font-family: roboto">Hello world</h1>')
// })

// As usual
server.listen(port, () => console.info(`Server running at http://localhost:${port}`))

// WHAT IS MISSING
// This is just a demo, as for the previous server example we have to implement an error handler and a better file handling.
// Unfortunately, Express.js doesn't support http2, so we need a different server framework or we have to implement manually.