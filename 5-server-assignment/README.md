# Bookmarks & Notes
This server should manage your bookmarks and notes. This implementation manage only bookmarks.

First install the dependencies with `npm i`, then start the server with `npm start`. You can see the UI at http://localhost:3000.

## MongoDB
The server by default uses a JSON-based db. A MongoDB implementation is also included, to use it just change this row in `routes/bookmarks.js`.
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

## Assignment
This server manages only the bookmarks. Extend it to manage also notes.

The bookmark object has this format.
```js
{
  "id": 0,
  "name": "Aldo's website",
  "url": "https://ald.ooo",
  "comment": "Aldo D'Aquino's portfolio. Contains Aldo's contact, in case I need some help."
}
```

The note object should instead have this format.
```js
{
  "id": 0,
  "title": "First note",
  "content": "This is my first note, to test if the system works."
}
```

I've prepared an example JSON that you can put in db.json.
```json
{
  "bookmarks": [
    {
      "id": 0,
      "name": "Aldo's website",
      "url": "https://ald.ooo",
      "comment": "Aldo D'Aquino's portfolio. Contains Aldo's contact, in case I need some help."
    },
    {
      "id": 1,
      "name": "https-localhost",
      "url": "https://sserve.dev",
      "comment": "The repository of https-localhost the Aldo's npm package. He said it's an express server, could be interesting exploring it."
    }
  ],
  "notes": [
    {
      "id": 0,
      "title": "First note",
      "content": "This is my first note, to test if the system works."
    },
    {
      "id": 1,
      "title": "TODO list",
      "content": "- add db functions\n- create a route\n- add the endpoint"
    }
  ]
}
```

### Tips
Remember that the notes doesn't have an `url` field, and that `name` corresponds to `title` and `comment` to `content`
- Create a new router `routes/notes.js` taking example from `routes/bookmarks.js`
- In `server.js` import the new `routes/notes.js` and use it on the endpoint `/api/notes`
- Create a new card manager `client/js/notes.js` taking example from `client/js/bookmarks.js`
- In `client/js/app.js` import and use the `client/js/notes.js` class and functions
- In `client/index.html` add a new `section` with id `notes` taking example from the one with id `bookmarks`
