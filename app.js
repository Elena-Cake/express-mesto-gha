const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes');

const { PORT = 3000 } = process.env;
const { CodeStatus } = require('./constans/CodeStatus');

mongoose
  .connect('mongodb://0.0.0.0:27017/mestodb')
  .then(() => {
    console.log('Database connected.');
  })
  .catch((err) => {
    console.log('Error on database connection');
    console.error(err);
  });

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = { _id: '63f668e2276459db5c5f5329' };
  next();
});
app.use(routes);

app.use((req, res) => {
  res.status(CodeStatus.INTERNAL.CODE).send(CodeStatus.INTERNAL.MESSAGE);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
