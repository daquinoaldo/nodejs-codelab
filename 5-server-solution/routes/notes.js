const express = require('express')
const NotesDb = require ('../db/notes-db')


const router = express.Router()
const db = new NotesDb()

// GET all notes
router.get("/", async (req, res) => {
  const notes = await db.getNotes()
  console.debug(`[notes] Notes list accessed.`)
  res.json({ notes })
  // Pro tip: you don't need to do { notes: notes }, { notes } it's enough.
  // You must specify the key if you want it different from the value, or if the value is an object property.
})

// GET a single note
router.get("/:id", async (req, res) => {
  const id = req.params.id
  const note = await db.getNote(id)

  if (note) {
    console.debug(`[notes] Note with ${id} accessed.`)
    res.json(note)
  } else {
    console.debug(`[notes] Note with ${id} not found.`)
    res.status(404).json({ error: "Note not found.", id })
  }
})

// Automatically parses the json body as JS object. req.body will contain that object.
router.use(express.json())

// A POST request is meant to creates objects.
router.post("/", async (req, res) => {
  // extract only allowed fields from body
  const { title, content } = req.body
  // and put them inside the note
  const note = { title, content }
  // TODO: ensure the fields are valid!

  // add the note in db
  const id = await db.addNote(note)
  console.log(`[notes] New note created with id ${id}.`, note)
  res.status(201).json({ id, ...note }) // 201 = created
})

// A PUT request is meant to update resources.
// It's very similar to the PORT, but the real difference is that the PUT is idempotent, the POST is not.
// Hence, updating many times the same resource is fine, the last update is the one that is kept.
// Posting two times a resource creates two resources (or at least it should).
router.put("/:id", async (req, res) => {
  const id = req.params.id

  // prepare the update object
  const update = {}
  if (req.body.title)   update.title   = req.body.title
  if (req.body.content) update.content = req.body.content

  // update the note
  const note = await db.updateNote(id, update)
  if (note) {
    console.log(`[notes] Note with id ${id} updated.`, note)
    res.json(note) // return the updated note
  } else {
    console.debug(`[notes] Note with ${id} not found.`)
    res.status(404).json({ error: "Note not found.", id })
  }
})

// DELETE a specific note
router.delete("/:id", async (req, res) => {
  const id = req.params.id
  const note = await db.deleteNote(id)

  if (note) {
    console.log(`[notes] Note with ${id} deleted.`)
    res.json(note)
  } else {
    console.debug(`[notes] Note with ${id} not found.`)
    res.status(404).json({ error: "Note not found.", id })
  }
})

module.exports = router