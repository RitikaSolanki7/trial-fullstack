
const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const ProjectController = require('../controllers/projectController');

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const name = Date.now() + '-' + file.originalname.replace(/\s+/g, '-');
    cb(null, name)
  }
})
const upload = multer({ storage });

router.get('/', ProjectController.getAll);
router.post('/', upload.single('image'), async (req, res, next) => {
  // crop/resize image to 450x350 as requested (bonus)
  try{
    if(req.file){
      const inputPath = path.join(req.file.path);
      const outputPath = path.join('uploads','crop-' + req.file.filename);
      await sharp(inputPath).resize(450, 350, {fit: 'cover'}).toFile(outputPath);
      // remove original
      fs.unlinkSync(inputPath);
      // set filename to cropped one
      req.file.filename = 'crop-' + req.file.filename;
    }
    next();
  }catch(err){
    console.error(err);
    next();
  }
}, ProjectController.create);

router.delete('/:id', ProjectController.delete);

module.exports = router;
