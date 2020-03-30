const http = require('http')


const port = 3000


const server = http.createServer((req, res) => {
  res.statusCode = 200
  // This will set a header in the response.
  // Headers are used by the receiver to handle the data sent as body.
  // In this case we inform the browser that the content is a json.
  // Even if you may not notice any difference in the result
  // (since the browser will probably show it as text anyway)
  // it's always important to set the right content type.
  res.setHeader('Content-Type', 'application/json')
  // JSON stands for JavaScript Object Notation. It's the standard way
  // (together with SOAP, that is less used) to exchange data between
  // client and server. A json is a stringified JS object.
  // To send an object to the browser we need to take the JS object,
  // reduce it to a valid json string and send it with the end function.
  // JSON.stringify allows to do that: takes an object as paramter and returns a string.
  // In this example our object is { message: "Hello world" }.
  // JSON.stringify returns '{"message":"Hello world"}' that is a json (notice the quotes around the key).
  res.end(JSON.stringify({
    message: "Hello world"
  }))
})


server.listen(port, () => {
  console.info(`Server running at http://localhost:${port}`)
})

// A json object can be parsed as a JS object with JSON.parse(json), that is the opposite of JSON.stringify.