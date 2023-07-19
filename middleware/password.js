const passwordValidator = require("password-validator");

const passwordSchema = new passwordValidator();

// Schema du mot de passe

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
        "Votre mot de passe doit comporter entre 6 et 20 caractères, 1 majuscule, 1 chiffre et sans espace",
    });
  }
};
