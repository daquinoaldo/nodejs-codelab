// The problem of our server is that for each URL it returns the same content!
// Try to visit http://localhost:3000 and http://localhost:3000/something,
// you'll get the same thing. Let's try to handle the different URLs.

const http = require('http')


const port = 3000


const server = http.createServer((req, res) => {
  // req contains all the information of the incoming request.
  // Among this, we can find url, that is the required path.
  // For example, if we visit http://localhost:3000/something
  // req.url will be "/something".
  console.log(req.url)

  // The switch is similar to an if, but for some specific situations.
  // We will compare the req.url to all the cases: "/" and "/user" in this example.
  // The default branch is visited only if no case apply.
  // break is used to exit the switch. default doesn't need the break.
  // If the break is omitted, all the cases that match the parameter of the switch will be executed.
  // This switch corresponds to:
  /*
  if (req.url == "/") {
    // ...
  } else if (req.url == "/user") {
    // ...
  } else { // this corresponds to default
    // ...
  }
  */
  switch(req.url) {
    case "/":
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({
        message: "Hello world"
      }))
      break
    case "/user":
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({
        name: "Aldo",
        surname: "D'Aquino",
        id: 12 
      }))
      break
    default:
      res.statusCode = 404  // we got an error, no more 200 OK (sorry browser, that will hurt a bit)
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({
        error: "Page not found"
      }))
  }
})
// If you visit http://localhost:3000 you'll get {"message":"Hello world"}.
// Visiting http://localhost:3000/user you get {"name":"Aldo","surname":"D'Aquino","id":12}.
// On http://localhost:3000/something-else you get {"error":"Page not found"}.
// Moreover, the latter url produces a 404.
// Open the developer tools sidebar (F12 on Chrome) and move to the network tab (reload the page to see results).
// You can see that the last url produces a red entry (404 it's an error), while the first two are black, which is okay.
// Clicking on an entry, you can see the request and response details.
// They include the "Content-Type":"application/json" header that we have set.


server.listen(port, () => {
  console.info(`Server running at http://localhost:${port}`)
})
