/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject, injectable } from "tsyringe";
import { UserService } from "../users/user.service";
import { IUser } from "../../interfaces/user.interface";
import { generateTokens } from "../../utils/generateToken";
import jwt from 'jsonwebtoken';

@injectable()
export class AuthService {
  constructor(@inject('UserService') private userService: UserService) {}

  async register(data: Omit<IUser, '_id' | 'userPassword'>) {
    return await this.userService.createUser(data);

  }

  async login(username: string, password: string): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const user = await this.userService.findByUsername(username);
    if(!user) throw new Error('Username wrong');
    
    const passwordValid = await user.comparePassword(password);
    if(!passwordValid) throw new Error('Password wrong');

    const { accessToken, refreshToken } = await generateTokens({
      userId: user?._id,
      role: user?.role
    })

    user.refreshToken = refreshToken;
    await user.save();

    return { accessToken, refreshToken }

  }

  async logout(userId: string) {
    return await this.userService.updateUser(userId, { refreshToken: null })
  }

  async refresh(token: string) : Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    if(!token) throw new Error('No refresh token provided')
    
    let payload: any;

    try {
      payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET as string);
    } catch {
      throw new Error("Invalid refresh token");
    }

    const user = await this.userService.findById(payload.userId);
    if (!user || user.refreshToken !== token) throw new Error("Invalid refresh token");
  
    const { accessToken, refreshToken } = await generateTokens({ userId: user._id, role: user.role });

     user.refreshToken = refreshToken;
    await user.save();

    return { accessToken, refreshToken };

  }

}
