# mern-stack-app
MERN app scaffolded with `create-react-app` and `express-generator` and heavily modified for domain-driven design.

## Premise
Creating an React client **and** an Express server by myself involves a dizzying amount of technical know-how which I wasn't ready to commit to learning. So I made this.

I figured using the two scaffolding tools would cut me some slack. 

- `create-react-app` - bootstraps React without overspending time on Webpack, Jest, EsLint and the likes.
- `express-generator` - starts Express quickly, but I had to restructure the endpoints a bit.

This is, by no means, expected to be a solid build.

## Download, Install, Run
1. Clone or this repository. Or [download and unzip it](https://github.com/andrewsantarin/mern-stack-app/archive/master.zip).
```sh
git clone https://github.com/andrewsantarin/mern-stack-app.git your-app-name-here
```

2. Run npm install. Twice. One directly in the root folder (server packages) and one in the client subfolder (client packages).

**npm**
```sh
# Browse to your-app-name-here's root path, then install the server dependencies.
cd your-app-name-here
npm install

# Browse to your-app-name-here/client, then install the client dependencies.
cd client
npm install

# Browse back to the root path
cd ..
```

**yarn**
```sh
# Browse to your-app-name-here's root path, then install the server dependencies.
cd your-app-name-here
yarn

# Browse to your-app-name-here/client, then install the client dependencies.
cd client
yarn

# Browse back to the root path
cd ..
```

3. Run the app.

**npm**
```sh
npm start
```

**yarn**
```sh
yarn start
```

## Expected folder structure
```
your-app-name
|-+ client                        # React folder
  |-+ public
  |-+ src
    |-+ app
    |-+ auth
    |-+ counter
    |-+ post
      |-- Post.jsx                # react
      |-- Routes.jsx              # react-router, e.g.: your-app-name.com/posts on the address bar
      |-- service.js              # axios,        e.g.: .get('/api/posts')
      |-- actions.js              # redux-thunk
      |-- reducer.js              # redux
    |-+ user
    |-- index.js
  |-- .gitignore
  |-- package.json                # React dependencies inside the 'client' folder
  
|-+ server                        # Express folder
  |-+ post                        # /api/posts
    |-- models.js                 # Mongoose models
    |-- routes.js                 # Express routes
  |-+ counter                     # /api/counters
  |-+ user                        # /api/users
  |-+ auth                        # ...and so on
  |-- api.js                      # API
  |-- configure-api-routes.js     # Route configurator
  |-- server.js                   # Server
|-- package.json                  # Express dependencies in the root folder (outside the 'server' folder)
|-- .gitignore
```
Each server endpoint is represented by a folder, which contains all of the logic, so `/api/posts` is in the `post` folder, `/api/users` is in the `user` folder, etc.
The same concept also applies to the client views, so `your-app-name.com/posts` receives data from `api.your-app-name.com/api/posts`.

For example, if you need a new "domain", like `shopping-cart`, for example, you do this:
- add its endpoint folder at `server/shopping-cart` with all of the required models and routes.
- add its view folder at `client/src/shopping-cart` with all of the components, reducers, actions and services.

This hopefully minimizes confusion if you work with other people.

## Optional Scaffolding Tools
No happy? No problem!

You'll need these packages installed globally if you want (re)build using the tools I used:

**npm**
```sh
npm install --global create-react-app
npm install --global express-generator
```

**yarn**
```sh
yarn add global create-react-app
yarn add global express-generator
```

You'll need some guides, too. These can help:
- [Create React App with an Express Backend](daveceddia.com/create-react-app-express-backend/)
- [Building CRUD Web Application using MERN Stack
](djamware.com/post/59faec0a80aca7739224ee1f/building-crud-web-application-using-mern-stack)
- [Introducing Express React Starter](https://medium.com/burke-knows-words/introducing-express-react-starter-b6d299206a3a)

Good luck!
