import { injectable } from "tsyringe";
import { IUser } from "../../interfaces/user.interface";
import User from "../../models/User";

@injectable()
export class UserService {

async findAll(
      page: number = 1,
      limit: number = 10,
      search?: string,
      role?: string,
) {
  const skip: number = (page - 1) * limit;
  const query: any = {};

  if (search) {
        query.$or = [
          { name: { $regex: search, $options: "i" } },  
        ];
  }

  if(role) {
     query.$or = [
          { role: { $regex: role, $options: "i" } },  
        ];
  }

  const users = await User.find(query)
    .populate({
      path: "history", 
      select: "title status priority assignedTo createdAt updatedAt", 
      populate: [
            { path: "createdBy", select: "name -_id" },
            { path: "assignedTo", select: "name -_id" }
          ]
    })
    .skip(skip)
    .limit(limit)
    .select("-__v -password");

 const total: number = await User.countDocuments();

  return {
      users,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      }
    }
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