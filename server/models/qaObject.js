const mongoose = require('mongoose');

const questions = [
  'What made me feel today? What did I feel?', 
  'What problem did I face today?',
  'What insight did I have today?',
  'What interested me today?',
]

const qaObjectSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    enum: questions
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