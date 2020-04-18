const path = require("path")
const Database = require("./database")

class notesDb extends Database {

  constructor(dbPath = path.join(__dirname, "./db.json")) {
    super(dbPath)
    this.db.notes = this.db.notes || []
  }

  async getNotes() {
    // do a deep deep copy
    const notes = []
    for (let note of this.db.notes)
      if (note) notes.push({ ...note })
    return notes
  }

  async getNote(id) {
    // ensure the id is valid
    if (id >= this.db.notes.length) return null
    // do a deep copy
    const note = this.db.notes[id]
    return note ? { ...note } : null
  }

  async addNote(note) {
    // do a deep copy
    const newNote = { ...note }
    // set the id
    newNote.id = this.db.notes.length
    // add the note
    this.db.notes.push(newNote)
    // write the db data to json
    this.save()
    // return the id of the added note
    return newNote.id
  }

  async updateNote(id, update) {
    // ensure the id is valid
    if (id >= this.db.notes.length) return null
    // get the note
    let note = this.db.notes[id]
    // update the note
    note = { ...note, ...update }
    // replace the note in the array
    this.db.notes[id] = note
    // write the db data to json
    this.save()
    // return a copy of the updated note
    return { ...note }
  }

  async deleteNote(id) {
    // ensure the id is valid
    if (id >= this.db.notes.length) return null
    // get the note
    const note = this.db.notes[id]
    // set it to null
    this.db.notes[id] = null
    // write the db data to json
    this.save()
    // return the deleted note (no need to copy)
    return note
  }

}

module.exports = notesDb