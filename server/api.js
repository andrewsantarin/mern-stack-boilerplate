const express = require('express');
const path = require('path');
const serveFavicon = require('serve-favicon');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const sassMiddleware = require('node-sass-middleware');

// Set up the API database connection.
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE, {
  useMongoClient: true
})
.then(() => {
  console.log('Database connection successful.');
})
.catch((error) => {
  console.error('Database connection failed:', JSON.stringify(error, null, 2));
});

const api = express();

// Set up the API view engine.
api.set('views', path.join(__dirname, 'site', 'views'));
api.set('view engine', 'pug');

// Uncomment favicon after placing your favicon in /public
api.use(serveFavicon(path.join(__dirname, 'site', 'public', 'favicon.ico')));

// Run the morgan HTTP request logger using the 'dev' format.
// https://github.com/expressjs/morgan#predefined-formats
api.use(morgan('dev'));
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: false }));
api.use(cookieParser());

api.use(sassMiddleware({
  src: path.join(__dirname, 'site', 'public'),
  dest: path.join(__dirname, 'site', 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true,
}));
api.use(express.static(path.join(__dirname, 'site', 'public')));

// Configure the routes for the API endpoints.
const configureApiRoutes = require('./configure-api-routes');
configureApiRoutes({
  excludePathNames: ['site'], // Ignore these non-API folders.
})(api);

// Render the Express index page.
const site = require('./site/');
api.use('/', site);

// Catch 404 and forward to error handler.
api.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Catch 500 and render the error page.
api.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.api.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = api;
