const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
// const { default: helmet } = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes');

const { PORT, DB_CONNECT_PATH } = require('./config');

const errorHandler = require('./midldlewares/error-handler');

mongoose
  .connect(DB_CONNECT_PATH)
  .then(() => {
    console.log('Database connected.');
  })
  .catch((err) => {
    console.log('Error on database connection');
    console.error(err);
  });

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('*', cors());

app.use(routes);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
