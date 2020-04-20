const express = require('express')
const compression = require("compression")
const minify = require("express-minify")
const bookmarksRouter = require("./routes/bookmarks")
const notesRouter = require("./routes/notes")


// Use the env port if available.
// You can override the default port (3000) running the server with "PORT=5000 npm start".
const port = process.env.PORT || 3000
const app = express()

// Use compression (gzip) to send less data. threshold: 1 activates the compression
// when the content is at least 1 byte, i.e. always. Default is 1Kb.
app.use(compression({ threshold: 1 }))
// Minify minifies JS and json, reducing the content length. app.set("json spaces", 0) removes spaces from json.
app.use(minify())
app.set("json spaces", 0)


/* Frontend */
// express.static is a middleware. It serves static html.
// There is plenty of middleware for express, e.g. gzip, error handlers, etc.
// A few middleware come with express, like express.static, express.json and others.
// Many others you can download through npm, with "npm i package-name".
// Explore packages on npmjs.com.
app.use("/", express.static("client"))


/* Backend */
// The endpoint /api/bookmarks is managed by the bookmarks router, that handles all the urls
// that starts with /api/bookmarks, like /api/bookmarks/my-bookmark-1.
app.use('/api/bookmarks', bookmarksRouter)
// Idem with notes
app.use('/api/notes', notesRouter)
// handle only 404 on apis, client 404 are handled in html by express
app.get("/api/*", (req, res) => res.status(404).json({ error: "API not found" }))


app.listen(port, () => console.log(`Server listening at http://localhost:${port}`))