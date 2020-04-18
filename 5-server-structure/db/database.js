const fs = require("fs")
const path = require("path")

class Database {

  db = {}

  constructor(dbPath = path.join(__dirname, "./db.json")) {
    this.dbPath = dbPath
    if (fs.existsSync(dbPath)) {
      const json = fs.readFileSync(this.dbPath) || "{}"
      this.db = JSON.parse(json)
      this.db.bookmarks = this.db.bookmarks || []
      this.db.notes = this.db.notes || []
    }
  }

  async save() {
    fs.writeFileSync(this.dbPath, JSON.stringify(this.db))
  }

}

module.exports = Database