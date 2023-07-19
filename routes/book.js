const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const optimizedImg = require("../middleware/sharp");

const bookCtrl = require("../controllers/book");

router.post("/", auth, multer, optimizedImg, bookCtrl.createBook);
router.put("/:id", auth, multer, optimizedImg, bookCtrl.modifyBook);
router.delete("/:id", auth, bookCtrl.deleteBook);
router.get("/:id", bookCtrl.findOneBook);
router.get("/", bookCtrl.getAllBooks);

module.exports = router;
