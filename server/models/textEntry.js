const mongoose = require('mongoose');

const textEntrySchema = new mongoose.Schema({
  free_text: {
    type: String,
    required: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

const TextEntry = mongoose.model('TextEntry', textEntrySchema);

module.exports = TextEntry; 