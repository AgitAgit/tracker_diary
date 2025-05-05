const mongoose = require('mongoose');

const textEntrySchema = new mongoose.Schema({
  title: {
    type: String,
    required: false
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  free_texts: [{
    type:String
  }],
  //maybe the questions should be objects from a list to ease handling. 
  // For now I'll keep it malliable, in later versions I can limit it to improve handling.
  qa_objects: [{
    question:String,
    anwser:String
  }],
  action_objects:[{
    description:String,
    tags:[String],
    start:Date,
    end:Date
  }],
  described_day_date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const TextEntry = mongoose.model('TextEntry', textEntrySchema);

module.exports = TextEntry;