const express = require('express')
const Database = require ('../db/database')


const router = express.Router()
const db = new Database()


router.get("/:username", async (req, res) => {
  const username = req.params.username
  const user = await db.getUser(username)

  if (user) {
    console.debug(`[users] Username ${username} found as ${user.name} ${user.surname}.`)
    res.json(user)
  } else {
    console.debug(`[users] User ${username} does not exists.`)
    res.status(404).json({ error: "User not found.", username })
    // Pro tip: you don't need to do { username: username }, { username } it's enough.
    // You must specify the key if you want it different from the value, or if the value is an object property.
  }
})

// Automatically parses the json body as JS object. req.body will contain that object.
router.use(express.json())


router.post("/:username", async (req, res) => {
  const username = req.params.username
  let user = await db.getUser(username)

  if (user) { // existent user, update it
    // prevent updating with undefined, if not specified, keep the existent
    user.name = req.body.name || user.name
    user.surname = req.body.surname || user.surname
    db.postUser(username, user)
    console.debug(`[users] User ${username} updated.`)
    res.json(user)
  } else {
    user = {
      username,
      // spread operator, represents all the fields in req.body
      ...req.body
    }
    db.postUser(username, user)
    console.debug(`[users] User ${username} created.`)
    res.status(201).json(user) // 201 = created
  }
})


module.exports = router