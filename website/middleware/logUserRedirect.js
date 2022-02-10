module.exports = (req, res, next) => {
  if (req.session.log) {
    res.redirect('/');
  } else {
    next();
  }
};
