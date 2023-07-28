const passwordValidator = require("password-validator");

const passwordSchema = new passwordValidator();

passwordSchema
  .is()
  .min(6)
  .is()
  .max(20)
  .has()
  .uppercase(1)
  .has()
  .lowercase()
  .has()
  .digits(1)
  .has()
  .not()
  .spaces();

module.exports = (req, res, next) => {
  if (passwordSchema.validate(req.body.password)) {
    next();
  } else {
    res.status(400).json({
      error:
        "Your password must be between 6 and 20 characters, 1 capital letter, 1 number and no spaces!",
    });
  }
};
