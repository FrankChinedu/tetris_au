import mongoose from 'mongoose';
interface IUser {
  username: string;
  password: string,
}

export interface UserDoc extends mongoose.Document {
  username: string;
  password: string;
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
    type: String
    // required: true
  }
});

userSchema.statics.build = (attr: IUser) => {
  return new User(attr);
};

const User = mongoose.model<UserDoc, userModelInterface>('User', userSchema);

User.build({
  password: 'user password',
  username: 'username'
});

export { User };
