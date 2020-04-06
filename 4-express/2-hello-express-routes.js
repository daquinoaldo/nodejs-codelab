const express = require('express')


const app = express()
const port = 3000


// res.json(obj) is the same as res.send(JSON.stringify(obj)),
// and it also do res.setHeader('Content-Type', 'application/json')
app.get("/", (req, res) => res.json({ message: "Hello world" }))

app.get("/user", (req, res) => res.json({
  name: "Aldo",
  surname: "D'Aquino",
  id: 12 
}))

// compare it with the default branch of the switch
app.get("*", (req, res) => res.status(404).json({ error: "Page not found" }))


app.listen(port, () => console.log(`Server listening at http://localhost:${port}`))



/* HTTP SERVER IMPLEMENTED WITH THE SWITCH, FOR REFERENCE
const server = http.createServer((req, res) => {
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
*/