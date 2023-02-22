const express = require('express');
const mongoose = require('mongoose');
const path = require('path')
const { MongoClient } = require('mongodb')
const routes = require('./routes')
const { PORT = 3001 } = process.env;
const bodyParser = require('body-parser')

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
app.use(bodyParser.json())
app.use(routes)

app.use((req, res, next) => {
  req.user = {
    _id: '63f668e2276459db5c5f5329'
  };

  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})
