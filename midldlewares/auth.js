const jsonwebtoken = require('jsonwebtoken');
const { CodeStatus } = require('../constans/CodeStatus');
const { JWT_SECRET } = require('../config');

// get
const auth = (req, res, next) => {
  console.log(req.headers);
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer')) {
    res.status(CodeStatus.UNAUTHORIZED.CODE)
      // .send({ message: CodeStatus.UNAUTHORIZED.MESSAGE });
      .send({ message: `start not bearer ${req.headers}` });
  }

  const jwt = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jsonwebtoken.verify(jwt, JWT_SECRET);
  } catch (err) {
    res.status(CodeStatus.UNAUTHORIZED.CODE)
      .send({ message: CodeStatus.UNAUTHORIZED.MESSAGE });
  }
  req.user = payload;
  return next();
};

module.exports = { auth };
