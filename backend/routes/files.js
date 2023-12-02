const express = require('express');
const router = express.Router();
const multer = require('multer');
const File = require('../models/File');
const jwt = require('jsonwebtoken');
const config = require('../config');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const newFile = new File({
      filename: req.file.filename,
      path: req.file.path,
      size: req.file.size,
      originalname: req.file.originalname,
      mimetype: req.file.mimetype
    });

    const savedFile = await newFile.save();

    res.json(savedFile);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get('/search/:filename', async (req, res) => {
  try {
    const file = await File.findOne({ filename: req.params.filename });

    if (!file) {
      return res.status(404).send('No file found');
    }

    res.json(file);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get('/download/:id', async (req, res) => {
  try {
    const file = await File.findById(req.params.id);

    if (!file) {
      return res.status(404).send('No file found');
    }

    res.download(file.path);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
