const fs = require("fs")
const path = require("path")

class Database {

  bookmarks = []

  constructor(dbPath = path.join(__dirname, "./db.json")) {
    this.dbPath = dbPath
    if (fs.existsSync(dbPath)) {
      const json = fs.readFileSync(this.dbPath) || "{}"
      const db = JSON.parse(json)
      this.bookmarks = db.bookmarks || []
    }
  }

  async save() {
    fs.writeFileSync(this.dbPath, JSON.stringify({ bookmarks: this.bookmarks }))
  }

  async getBookmarks() {
    // do a deep deep copy
    const bookmarks = []
    for (let bookmark of this.bookmarks)
      if (bookmark) bookmarks.push({ ...bookmark })
    return bookmarks
  }

  async getBookmark(id) {
    // ensure the id is valid
    if (id >= this.bookmarks.length) return null
    // do a deep copy
    const bookmark = this.bookmarks[id]
    return bookmark ? { ...bookmark } : null
  }

  async addBookmark(bookmark) {
    // do a deep copy
    const newBookmark = { ...bookmark }
    // set the id
    newBookmark.id = this.bookmarks.length
    // add the bookmark
    this.bookmarks.push(newBookmark)
    // write the db data to json
    this.save()
    // return the id of the added bookmark
    return newBookmark.id
  }

  async updateBookmark(id, update) {
    // ensure the id is valid
    if (id >= this.bookmarks.length) return null
    // get the bookmark
    let bookmark = this.bookmarks[id]
    // update the bookmark
    bookmark = { ...bookmark, ...update }
    // replace the bookmark in the array
    this.bookmarks[id] = bookmark
    // write the db data to json
    this.save()
    // return a copy of the updated bookmark
    return { ...bookmark }
  }

  async deleteBookmark(id) {
    // ensure the id is valid
    if (id >= this.bookmarks.length) return null
    // get the bookmark
    const bookmark = this.bookmarks[id]
    // set it to null
    this.bookmarks[id] = null
    // write the db data to json
    this.save()
    // return the deleted bookmark (no need to copy)
    return bookmark
  }

}

// This "export" says that this class can be used from outside this file.
// We will import this class with const Database = require("/path/to/db.js").
module.exports = Database