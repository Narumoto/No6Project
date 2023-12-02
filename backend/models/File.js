const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true
  },
  filetype: {
    type: String,
    required: true
  },
  data: {
    type: Buffer,
    required: true
  },
  anonymous: {
    type: Boolean,
    default: true
  },
  uploader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  annotations: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    annotation: {
      type: String
    }
  }],
  tags: [{
    type: String
  }],
  token: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Token'
  }
});

module.exports = mongoose.model('File', FileSchema);
