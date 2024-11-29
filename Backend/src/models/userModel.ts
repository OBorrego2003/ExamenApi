import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
  history: mongoose.Schema.Types.ObjectId[];
}

const userSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  history: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }]
});

export default mongoose.model<IUser>('User', userSchema);
