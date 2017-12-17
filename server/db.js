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
