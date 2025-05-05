const mongoose = require('mongoose');

const actionObjectSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  tags:[String],
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  start:Date,
  end:{
    type:Date,
    default:Date.now
  }
}, {
  timestamps: true
});

const ActionObject = mongoose.model('ActionObject', actionObjectSchema);

module.exports = ActionObject;