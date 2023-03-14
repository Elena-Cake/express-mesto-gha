const jsonwebtoken = require('jsonwebtoken');
const { CodeStatus } = require('../constans/CodeStatus');
const { JWT_SECRET } = require('../config');

// get
const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer')) {
    res.status(CodeStatus.UNAUTHORIZED.CODE)
      .send({ message: CodeStatus.UNAUTHORIZED.MESSAGE });
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