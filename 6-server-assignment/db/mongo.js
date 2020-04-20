const { MongoClient, ObjectId } = require('mongodb')


class Mongo {

  uri = process.env.MONGO_URI || "mongodb://localhost:27017/"

  constructor(collection) {
    this.client = new MongoClient(this.uri, { useUnifiedTopology: true })
    this.collectionName = collection
  }

  #connect = async () => {
    if (this.collection) return // already connected
    await this.client.connect()
      .then(client => {
        this.db = client.db("bookmarks-notes")
        this.collection = this.db.collection(this.collectionName)
      })
  }
  
  async getAll() {
    await this.#connect()
    // return the array
    return this.collection.find().toArray()
      .then(array => array.map(item => {
        const { _id, ...object } = item
        return { id: _id, ...object }
      }))
  }
  async get(id) {
    await this.#connect()
    // return the object
    return this.collection.findOne({ _id: new ObjectId(id) })
  }
  async add(object) {
    await this.#connect()
    // return the id
    return this.collection.insertOne(object).then(res => res.insertedId)
  }
  async update(id, update) {
    await this.#connect()
    // return true/false
    return this.collection.updateOne({ _id: new ObjectId(id) }, { $set: update }).then(res => res.result.nModified == 1)
  }
  async delete(id) {
    console.log(id)
    await this.#connect()
    // return true/false
    return this.collection.deleteOne({ _id: new ObjectId(id) }).then(res => (res.result.ok && res.result.n) || res.deletedCount)
  }

}

module.exports = Mongo