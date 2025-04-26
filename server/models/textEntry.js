const mongoose = require('mongoose');

const textEntrySchema = new mongoose.Schema({
  title: {
    type: String,
    required: false
  },
  free_text: {
    type: String,
    required: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  described_day_date: Date
}, {
  timestamps: true
});

const TextEntry = mongoose.model('TextEntry', textEntrySchema);

module.exports = TextEntry;