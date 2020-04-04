const express = require('express')
const userRouter = require("./router/user")


const app = express()
const port = 3000


/* Frontend */
// express.static is a middleware. It serves static html.
// There is plenty of middleware for express, e.g. gzip, error handlers, etc.
// A few middleware come with express, like express.static, express.json and others.
// Many others you can download through npm, with "npm i package-name".
// Explore packages on npmjs.com.
app.use("/", express.static("client"))


/* Backend */
// The endpoint /api/user is managed by the user router, that handles all the urls
// that starts with /api/user, like /api/user/daquinoaldo.
app.use('/api/user', userRouter)
// handle only 404 on apis, client 404 are handled in html by express
app.get("/api/*", (req, res) => res.status(404).json({ error: "Page not found" }))


app.listen(port, () => console.log(`Server listening at http://localhost:${port}`))