import { injectable } from "tsyringe";
import { IUser } from "../../interfaces/user.interface";
import User from "../../models/User";

@injectable()
export class UserService {

  async findAll() {
    return  User.find()
  }

  async findById(id: string) {
    return await User.findById(id);
  }

  async findByUsername(username: string) {
    return await User.findOne({ username })
  }

  async findByEmail(email: string) {
    return await User.findOne({ email })
  }

  async createUser(data: Omit<IUser, '_id' | 'password'>) {
    const user = new User(data);
    await user.save();
    return user;
  }

  async updateUser(id: string, updateData: Partial<IUser>) {
    return await User.findByIdAndUpdate(id, updateData);
  }

  async deleteUser(id: string) {
    return await User.findByIdAndDelete(id);
  }

}