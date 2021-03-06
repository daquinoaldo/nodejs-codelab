const express = require('express')
const Database = require ('../db/database')


const router = express.Router()
const db = new Database("bookmarks")

// Automatically parses the json body as JS object. req.body will contain that object.
router.use(express.json())

// GET all bookmarks
router.get("/", async (req, res) => {
  const bookmarks = await db.getAll()
  console.debug(`[bookmarks] Bookmarks list accessed.`)
  res.json({ bookmarks })
  // Pro tip: you don't need to do { bookmarks: bookmarks }, { bookmarks } it's enough.
  // You must specify the key if you want it different from the value, or if the value is an object property.
})

// GET a single bookmark
router.get("/:id", async (req, res) => {
  const id = req.params.id
  const bookmark = await db.get(id)

  if (bookmark) {
    console.debug(`[bookmarks] Bookmark with id ${id} accessed.`)
    res.json(bookmark)
  } else {
    console.debug(`[bookmarks] Bookmark with id ${id} not found.`)
    res.status(404).json({ error: "Bookmark not found.", id })
  }
})

// A POST request is meant to creates objects.
router.post("/", async (req, res) => {
  // extract only allowed fields from body
  const { name, url, comment } = req.body
  // and put them inside the bookmark
  const bookmark = { name, url, comment }
  // TODO: ensure the fields are valid!

  // add the bookmark in db
  const id = await db.add(bookmark)
  console.log(`[bookmarks] New bookmark created with id ${id}.`, bookmark)
  res.status(201).json({ message: "Bookmark created", id }) // 201 = created
})

// A PUT request is meant to update resources.
// It's very similar to the PORT, but the real difference is that the PUT is idempotent, the POST is not.
// Hence, updating many times the same resource is fine, the last update is the one that is kept.
// Posting two times a resource creates two resources (or at least it should).
router.put("/:id", async (req, res) => {
  const id = req.params.id

  // prepare the update object
  const update = {}
  if (req.body.name)    update.name    = req.body.name
  if (req.body.url)     update.url     = req.body.url
  if (req.body.comment) update.comment = req.body.comment

  // update the bookmark
  if (await db.update(id, update)) {
    console.log(`[bookmarks] Bookmark with id ${id} updated.`, update)
    res.json({ message: "Bookmark updated.", id })
  } else {
    console.debug(`[bookmarks] Bookmark with id ${id} not found.`)
    res.status(404).json({ error: "Bookmark not found.", id })
  }
})

// DELETE a specific bookmark
router.delete("/:id", async (req, res) => {
  const id = req.params.id

  if (await db.delete(id)) {
    console.log(`[bookmarks] Bookmark with id ${id} deleted.`)
    res.json({ message: "Bookmark deleted.", id })
  } else {
    console.debug(`[bookmarks] Bookmark with id ${id} not found.`)
    res.status(404).json({ error: "Bookmark not found.", id })
  }
})

module.exports = router