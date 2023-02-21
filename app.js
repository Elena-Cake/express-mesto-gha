const express = require('express');
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb')
const routes = require('./routes')
const { PORT = 3001 } = process.env;

mongoose
  .connect('mongodb://0.0.0.0:27017/mestodb')
  .then(() => {
    console.log('Database connected.');
  })
  .catch((err) => {
    console.log('Error on database connection');
    console.error(err);
  });

const app = express()

app.use(express.static(path.join((__dirname, 'public'))))
// app.use(bodyParse.json()) //!
app.use(routes)


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})
