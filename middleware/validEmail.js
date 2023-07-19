const validator = require("validator");

module.exports = (req, res, next) => {
  if (!validator.isEmail(req.body.email)) {
    return res
      .status(400)
      .json({ error: `L'email ${req.body.email} n'est pas valide` });
  } else {
    next();
  }
};
