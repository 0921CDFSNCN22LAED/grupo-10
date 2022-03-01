const { validationResult } = require('express-validator');
const { unlink } = require('fs/promises');
const path = require('path');

module.exports = async (req, res, next) => {
  const errors = validationResult(req);
  console.log('errors', errors);
  if (!errors.isEmpty()) {
    req.session.errors = errors.mapped();
    req.session.old = req.body;
    try {
      await unlink(path.resolve(__dirname, `../${req.file.path}`));
      console.log(`successfully deleted ${req.file.path}`);
    } catch (error) {
      console.error('there was an error:', error.message);
    }
    res.redirect('back');
  } else {
    next();
  }
};
