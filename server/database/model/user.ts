import mongoose from 'mongoose';
interface IUser {
  username: string;
  password: string,
  email: string,
}

export interface UserDoc extends mongoose.Document {
  username: string;
  password: string;
  email: string;
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
    type: String,
    required: true
  },
  tetris: {
    type: mongoose.Types.ObjectId,
    ref: 'Tetris'
  }
});

userSchema.statics.build = (attr: IUser) => {
  return new User(attr);
};

const User = mongoose.model<UserDoc, userModelInterface>('User', userSchema);

export { User };
