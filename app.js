const express = require('express');
const mongoose = require('mongoose');
// const { default: helmet } = require('helmet');
// const cors = require('cors');
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

// app.use(helmet());
// app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = { _id: '63f668e2276459db5c5f5329' };
  next();
});
app.use(routes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
