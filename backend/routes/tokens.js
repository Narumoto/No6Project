const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Token = require('../models/Token');
const User = require('../models/User');

// Middleware for checking authentication
const checkAuth = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_KEY);
  req.userData = decoded;
  next();
};

// Route to get all tokens
router.get('/', checkAuth, async (req, res) => {
  try {
    const tokens = await Token.find();
    res.json(tokens);
  } catch (err) {
    res.json({ message: err });
  }
});

// Route to get a specific token
router.get('/:tokenId', checkAuth, async (req, res) => {
  try {
    const token = await Token.findById(req.params.tokenId);
    res.json(token);
  } catch (err) {
    res.json({ message: err });
  }
});

// Route to create a new token
router.post('/', checkAuth, async (req, res) => {
  const token = new Token({
    user: req.userData.userId,
    file: req.body.fileId,
    created: Date.now()
  });

  try {
    const savedToken = await token.save();
    res.json(savedToken);
  } catch (err) {
    res.json({ message: err });
  }
});

// Route to delete a token
router.delete('/:tokenId', checkAuth, async (req, res) => {
  try {
    const removedToken = await Token.remove({ _id: req.params.tokenId });
    res.json(removedToken);
  } catch (err) {
    res.json({ message: err });
  }
});

// Route to update a token
router.patch('/:tokenId', checkAuth, async (req, res) => {
  try {
    const updatedToken = await Token.updateOne(
      { _id: req.params.tokenId },
      { $set: {file: req.body.fileId} }
    );
    res.json(updatedToken);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
