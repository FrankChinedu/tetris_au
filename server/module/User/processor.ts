import { User as UserModel, UserDoc } from '../../database/model';
import { ResponseDataI } from '../../interfaces';
import bcrypt from 'bcrypt';

const User = {
  signup: async (body:any): Promise<ResponseDataI> => {
    try {
      const user = await UserModel.create(body) as UserDoc;
      return {
        status: 200,
        message: 'success',
        data: {
          username: user.username,
          id: user._id
        }
      };
    } catch (error) {
      return {
        status: 500,
        message: 'an Error must have occured'
      };
    }
  },
  login: async (body:any): Promise<ResponseDataI> => {
    const { username, password } = body;
    const user = await UserModel.findOne({
      username
    }) as UserDoc;

    if (!user) {
      return {
        status: 400,
        message: 'invalid credntials'
      };
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return {
        status: 400,
        message: 'invalid credntials'
      };
    }

    return {
      status: 200,
      message: 'success',
      data: {
        username: user.username,
        id: user._id
      }
    };
  }
};

export default User;
