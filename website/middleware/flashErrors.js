module.exports = (req, res, next) => {
  console.log('req.session', req.session);
  res.locals.errors = req.session.errors;
  res.locals.old = req.session.old;
  req.session.errors = '';
  req.session.old = '';
  res.locals.nextPageMessage = req.session.nextPageMessage;
  req.session.nextPageMessage = '';

  next();
};
