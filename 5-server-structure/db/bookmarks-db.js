const path = require("path")
const Database = require("./database")

class bookmarksDb extends Database {

  constructor(dbPath = path.join(__dirname, "./db.json")) {
    super(dbPath)
    this.db.bookmarks = this.db.bookmarks || []
  }

  async getBookmarks() {
    // do a deep deep copy
    const bookmarks = []
    for (let bookmark of this.db.bookmarks)
      if (bookmark) bookmarks.push({ ...bookmark })
    return bookmarks
  }

  async getBookmark(id) {
    // ensure the id is valid
    if (id >= this.db.bookmarks.length) return null
    // do a deep copy
    const bookmark = this.db.bookmarks[id]
    return bookmark ? { ...bookmark } : null
  }

  async addBookmark(bookmark) {
    // do a deep copy
    const newBookmark = { ...bookmark }
    // set the id
    newBookmark.id = this.db.bookmarks.length
    // add the bookmark
    this.db.bookmarks.push(newBookmark)
    // write the db data to json
    this.save()
    // return the id of the added bookmark
    return newBookmark.id
  }

  async updateBookmark(id, update) {
    // ensure the id is valid
    if (id >= this.db.bookmarks.length) return null
    // get the bookmark
    let bookmark = this.db.bookmarks[id]
    // update the bookmark
    bookmark = { ...bookmark, ...update }
    // replace the bookmark in the array
    this.db.bookmarks[id] = bookmark
    // write the db data to json
    this.save()
    // return a copy of the updated bookmark
    return { ...bookmark }
  }

  async deleteBookmark(id) {
    // ensure the id is valid
    if (id >= this.db.bookmarks.length) return null
    // get the bookmark
    const bookmark = this.db.bookmarks[id]
    // set it to null
    this.db.bookmarks[id] = null
    // write the db data to json
    this.save()
    // return the deleted bookmark (no need to copy)
    return bookmark
  }

}

module.exports = bookmarksDb