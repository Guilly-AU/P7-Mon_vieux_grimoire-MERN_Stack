const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const password = require("../middleware/password");
const validEmail = require("../middleware/validEmail");
const logInlimiter = require("../middleware/rate-limiter");

router.post("/signup", validEmail, password, userCtrl.signup);
router.post("/login", logInlimiter, userCtrl.login);

module.exports = router;
