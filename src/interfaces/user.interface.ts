import { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  username: string;
  email: string;
  password: string;
  role: "admin" | "developer" | "user";
  refreshToken?: string | null;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  comparePassword(userPassword?: string): Promise<boolean>;
}