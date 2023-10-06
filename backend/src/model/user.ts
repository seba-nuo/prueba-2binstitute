import mongoose, {Document, Model, Schema } from 'mongoose';

interface IUser extends Document {
  email: string;
  password: string;
  role: string;
}

const userSchema: Schema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
  },
});

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);

export {User};
