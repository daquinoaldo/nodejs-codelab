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


## Deploy to Heroku
Why Heroku? 'cause it's simple.

You will need
- An [Heroku account](https://signup.heroku.com/)
- heroku cli installed: `npm i -g heroku`
- A project to be deployed (e.g. the Bookmarks & Notes server)
- Some knowledge of git could be useful, but it's not mandatory

Init the heroku project (only the first time)
```bash
cd your/project/path
git init                      # initialize a git repository, it's needed for heroku
heroku create [project-name]  # create the heroku project, if you omit project-name a random one is assigned 
```

Deploy the project (the first time + every time you change something)
```bash
git add -A                         # stages every changes
git commit -m "Changelog message"  # encapsulate all the changes in a commit
git push heroku master             # upload your commit with all the changes to heroku
```

Once deployed you will see a message like `https://project-name.herokuapp.com/ deployed to Heroku`.
At that url you will see you deployed project.