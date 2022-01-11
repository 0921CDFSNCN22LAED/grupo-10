const { validationResult } = require('express-validator');

module.exports = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.session.errors = errors.mapped();
    req.session.old = req.body;
    res.redirect('back');
  } else {
    next();
  }
};
