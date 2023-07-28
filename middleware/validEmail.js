const validator = require("validator");

module.exports = (req, res, next) => {
  if (!validator.isEmail(req.body.email)) {
    return res
      .status(400)
      .json({ error: `Email ${req.body.email} is not valide!` });
  } else {
    next();
  }
};
