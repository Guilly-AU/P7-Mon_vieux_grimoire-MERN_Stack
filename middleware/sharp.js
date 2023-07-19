const sharp = require("sharp");
sharp.cache(false);

const fs = require("fs");

const optimizedImg = async (req, res, next) => {
  if (!req.file) {
    return next();
  }
  try {
    await sharp(req.file.path)
      .resize({
        width: 500,
      })
      .webp({ quality: 80 })
      .toFile(`${req.file.path.split(".")[0]}.webp`);

    fs.unlink(req.file.path, (error) => {
      req.file.path = `${req.file.path.split(".")[0]}.webp`;
      if (error) {
        console.log(error);
      }
      next();
    });
  } catch (error) {
    res.status(500).json({ error: "Impossible d'optimiser l'image" });
  }
};

module.exports = optimizedImg;
//
