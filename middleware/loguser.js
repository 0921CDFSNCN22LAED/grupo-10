module.exports = (req, res, next) => {
  console.log("aca estamos")
  res.locals.loguser = req.session && req.session.log ? req.session.log : ""
  console.log(req.session)
  next();
};
