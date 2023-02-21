const express = require('express');
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb')

const { PORT = 3001 } = process.env;

const app = express();
let db

mongoose
  .connect('mongodb://0.0.0.0:27017/mestodb')
  .then(() => {
    console.log('Database connected.');
  })
  .catch((err) => {
    console.log('Error on database connection');
    console.error(err);
  });

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})

// const connectToDb = (res) => {
//   MongoClient
//     .connect('mongodb://localhost:27017')
//     .then((client) => {
//       console.log('connected to MongoDB')
//       dbConnection = client.db()
//       return res()
//     })
//     .catch((err) => {
//       return res(err)
//     })
// }
// const getDB = () => { dbConnection }

// connectToDb((err) => {
//   if (!err) {
//     app.listen(PORT, () => {
//       console.log(`App listening on port ${PORT}`)
//     })
//     db = getDB()
//   } else {
//     console.log(`DB connection error: ${err}`);
//   }
// })

