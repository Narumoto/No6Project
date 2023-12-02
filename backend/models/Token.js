const mongoose = require('mongoose');

const TokenSchema = new mongoose.Schema({
  tokenId: {
    type: String,
    required: true,
    unique: true
  },
  file: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'File',
    required: true
  },
  uploader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  annotator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Token', TokenSchema);
