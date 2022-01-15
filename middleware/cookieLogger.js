const mainServices = require('../services/mainServices');

module.exports = (req, res, next) => {
  if (req.cookies.email) {
    req.session.user = mainServices.getUserbyEmail(req.cookies.email);
    req.session.log = true;
  }
  next();
};
