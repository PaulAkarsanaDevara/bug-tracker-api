import crypto from 'crypto';
import jwt, { SignOptions } from 'jsonwebtoken';

export async function generateTokens(payload: object): Promise<{ accessToken: string, refreshToken: string }> {
    if(!process.env.JWT_SECRET || !process.env.JWT_REFRESH_SECRET) {
      throw new Error("JWT secrets are not configured in environment variables")
    }

    const accessOptions: SignOptions = { 
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || '15m',
     }

    const refreshOptions: SignOptions = {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || "7d",
    };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, accessOptions);
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, refreshOptions);

    return { accessToken, refreshToken };

} 

export async function generateResetToken() {
  const token = crypto.randomBytes(32).toString('hex');
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
  return  { token, hashedToken };
}