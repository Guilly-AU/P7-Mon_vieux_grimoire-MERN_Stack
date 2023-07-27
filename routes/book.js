const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const optimizedImg = require("../middleware/sharp");

const bookCtrl = require("../controllers/book");

router.post("/", auth, multer, optimizedImg, bookCtrl.createBook);
router.post("/:id/rating", auth, bookCtrl.rateBook);
router.put("/:id", auth, multer, optimizedImg, bookCtrl.modifyBook);
router.delete("/:id", auth, bookCtrl.deleteBook);
router.get("/bestrating", bookCtrl.getBestBooks);
router.get("/:id", bookCtrl.findOneBook);
router.get("/", bookCtrl.getAllBooks);

module.exports = router;
