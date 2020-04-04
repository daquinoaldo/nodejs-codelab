const fs = require("fs")
const path = require("path")


// This is a class.
// It's not so different from an object, it have properties (fields) and methods (functions).
// You should not add const/let before a variable, nor function before a function.
// Everything else is the same as before. You are ready to go now!
class Database {

  // This is the constructor, it is invoked when you perform a "new Database()".
  // Constructor can have parameter, in our case you can do "new Database('/path/to/db.json')"
  constructor(dbPath = path.join(__dirname, "./db.json")) {
    this.dbPath = dbPath
  }

  // This function should be private.
  // But ups, JS class are not classes yet.
  // Yep, a JS class is actually an object. You can declare it like const Database = { ... }.
  // The only difference is that if you write class, you'll need a new.
  // But classes will be classes soon: there is a stage-3 proposal for private members.
  // You can find it here: https://github.com/tc39/proposal-class-fields. It may come with ES10.
  // For the moment, just ad a TODO.
  // TODO: this should be private.
  async readDb() {  // aka getUsers in lesson2
    return new Promise((resolve, reject) => {
      fs.readFile(this.dbPath, (err, buffer) => {
        if (err) reject(err)
        resolve(JSON.parse(buffer))
      })
    })
  }

  async writeDb(data) {
    // The callback should accept no param, so just resolve.
    return new Promise(resolve => fs.writeFile(this.dbPath, JSON.stringify(data), resolve))
  }

  getUser(username) {
    // To access methods and variables of the same class use "this", it's a pointer to the class instance.
    return this.readDb()
      .then(db => db.users)
      .then(users => users.filter(user => user.username === username))
      .then(users => users.length ? users[0] : null)
  }

  postUser(username, user) {
    return this.readDb()
      .then(db => {
        // remove the user (if exists) and add the new one
        db.users = db.users.filter(user => user.username !== username)
        // add the new user
        db.users.push(user)
        // write back the file
        return this.writeDb(db)
      })
  }
  
}

// This "export" says that this class can be used from outside this file.
// We will import this class with const Database = require("/path/to/db.js").
module.exports = Database