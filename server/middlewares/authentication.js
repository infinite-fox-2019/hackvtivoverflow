const jwt = require("../helpers/jwt");

function authentication(req, res, next) {
  try {
    const decode = jwt.decode(req.headers.token);
    req.decode = decode;
    next();
  } catch (err) {
    err.status = 401;
    err.message = "not authenticated, please login";
    next(err);
  }
}

module.exports = authentication;
