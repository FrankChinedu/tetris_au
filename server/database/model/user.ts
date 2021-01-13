import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const salt = 10;
interface IUser {
  username: string;
  password: string,
  email?: string,
}

export interface UserDoc extends mongoose.Document {
  username: string;
  password: string;
  email?: string;
  tetris?: mongoose.Types.ObjectId;
}

interface userModelInterface extends mongoose.Model<UserDoc> {
  build(attr: IUser): UserDoc;
}

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  tetris: {
    type: mongoose.Types.ObjectId,
    ref: 'Tetris'
  }
}, { timestamps: true });

userSchema.statics.build = (attr: IUser) => {
  return new User(attr);
};

userSchema.pre('save', async function hashPassword (this: UserDoc, next) {
  if (!this.isModified('password')) {
    return next();
  }

  this.password = this.password && await bcrypt.hash(this.password, salt);
  return next();
});

const User = mongoose.model<UserDoc, userModelInterface>('User', userSchema);

export { User };
