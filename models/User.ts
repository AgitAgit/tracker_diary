import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  user_name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema({
  user_name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

export default mongoose.model<IUser>('User', UserSchema); 