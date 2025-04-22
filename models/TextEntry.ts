import mongoose, { Schema, Document } from 'mongoose';

export interface ITextEntry extends Document {
  free_text: string;
  user_id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const TextEntrySchema: Schema = new Schema({
  free_text: {
    type: String,
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
}, {
  timestamps: true
});

export default mongoose.model<ITextEntry>('TextEntry', TextEntrySchema); 