module.exports = (req, res, next) => {
  res.locals.errors = req.session.errors;
  res.locals.old = req.session.old;
  req.session.errors = '';
  req.session.old = '';

  next();
};
