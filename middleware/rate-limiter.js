const rateLimit = require("express-rate-limit");

const logInLimiter = rateLimit({
  max: 5, //limit request
  windowMs: 15 * 60 * 1000, //Time before new request
  message: "You can't make any more requests at the moment. Try again later",
});

module.exports = logInLimiter;
