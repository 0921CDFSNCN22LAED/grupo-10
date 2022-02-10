module.exports = (req, res, next) => {
  if (!req.session.log) {
    req.session.nextPage = req.route.path;
    res.redirect('/login');
  } else {
    next();
  }
};
