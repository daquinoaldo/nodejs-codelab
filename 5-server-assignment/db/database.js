const fs = require("fs")
const path = require("path")

class Database {

  dbPath = path.join(__dirname, "./db.json")
  db = {}

  constructor(collection) {
    // load the database if exists
    if (fs.existsSync(this.dbPath)) {
      const json = fs.readFileSync(this.dbPath) || "{}"
      this.db = JSON.parse(json)
    }
    this.collection = this.db[collection] || []
  }

  #save = () => fs.writeFileSync(this.dbPath, JSON.stringify(this.db))

  async getAll() {
    // remove the nul objects: !obj returns true for null objects,
    // hence !!obj returns false for null objects
    return this.collection.filter(obj => !!obj)
  }

  async get(id) {
    // ensure the id is valid
    if (id >= this.collection.length) return null
    // do a deep copy
    const object = this.collection[id]
    // return the object or null
    return object ? { ...object } : null
  }

  async add(object) {
    // do a deep copy
    const newObject = { ...object }
    // set the id
    newObject.id = this.collection.length
    // add the new object
    this.collection.push(newObject)
    // write the db data to json
    this.#save()
    // return the id of the added object
    return newObject.id
  }

  async update(id, update) {
    // ensure the id is valid
    if (id >= this.collection.length) return false
    // get the object
    let object = this.collection[id]
    // ensure the object is not deleted
    if (!object) return false
    // update the object
    object = { ...object, ...update }
    // replace the object in the array
    this.collection[id] = object
    // write the db data to json
    this.#save()
    return true
  }

  async delete(id) {
    // ensure the id is valid
    if (id >= this.collection.length) return false
    // if already deleted return false
    if (!this.collection[id]) return false
    // set it to null
    this.collection[id] = null
    // write the db data to json
    this.#save()
    return true
  }

}

module.exports = Database