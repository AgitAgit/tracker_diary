const mongoose = require('mongoose');

const qaObjectSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  answer: String,
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  described_day_date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const QAObject = mongoose.model('QAObject', qaObjectSchema);

module.exports = QAObject;