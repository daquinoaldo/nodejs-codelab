# Bookmarks & Notes
This server manages bookmarks and notes.

First install the dependencies with `npm i`, then start the server with `npm start`. You can see the UI at http://localhost:3000.

## MongoDB
The server by default uses a JSON-based db. A MongoDB implementation is also included,
to use it just change this row in `routes/bookmarks.js` and `routes/notes.js`.
```js
// from this
const Database = require ('../db/database')
// to this
const Database = require ('../db/mongo')
```

You must have MongoDB installed and running.
- Download the [MongoDB Community Server](mongodb.com/download-center/community)
- Create a folder for the db data: `mkdir mongodata`
- Run the server `mongod --dbpath mongodata`
- You can check if the server is running with `mongo`: once the mongo cli is open, entering `db` you should see `test`