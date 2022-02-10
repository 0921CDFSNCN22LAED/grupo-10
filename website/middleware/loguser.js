module.exports = (req, res, next) => {
  res.locals.loguser = req.session && req.session.log ? req.session.log : "";
  res.locals.user = req.session && req.session.user ? req.session.user : "";
  next();
};
