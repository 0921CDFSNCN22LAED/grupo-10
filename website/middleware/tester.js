module.exports = (req, res, next) => {
  console.log('req.body', req.body);
  console.log('req.session', req.session);
  next();
};
