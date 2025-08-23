import mongoose, { Schema } from "mongoose";
import { IUser } from "../interfaces/user.interface";
import bcrypt from "bcrypt";

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "developer", "user"], default: "user" },
  history: [{ type: Schema.Types.ObjectId, ref: "Bug" ,  default: []}],
  refreshToken: { type: String },
  resetPasswordToken: String,
  resetPasswordExpires: Date
}, { timestamps: true });

userSchema.methods.comparePassword = async function (
  this: IUser,
  userPassword: string
): Promise<boolean> {
  return await bcrypt.compare(userPassword, this.password);
};

userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});



export default mongoose.model<IUser>("User", userSchema);