/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject, injectable } from "tsyringe";
import { AuthService } from "./auth.service";
import { Request, Response } from 'express';
import { AuthRequest } from "../../middleware/auth";

@injectable()
export class AuthController {
  constructor(@inject('AuthService') private authService: AuthService) {}

  async register(req: Request, res: Response) {
    try {
      const data = await this.authService.register(req.body);
      res.status(201).json({ message: 'Register success', data });
    } catch (err: any) {
      res.status(500).json({ message: err.message || 'Internal server error' });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const data = await this.authService.login(username, password);
      res.json({ message: 'Login success', data })
    } catch (err: any) {
      res.status(500).json({ message: err.stack || 'Internal server error' });
    }
  }

  async logout(req: AuthRequest, res: Response) {
    try {
      await this.authService.logout(req.user.userId);
      return  res.json({ message: "Logout success"});
    } catch (err: any) {
      res.status(500).json({ message: err.message || 'Internal server error' });
    }
  }

  async refresh(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body;
      const data = await this.authService.refresh(refreshToken);
      res.json({ message: "Token refresh success", data });
    } catch (err: any) {
      res.status(401).json({ error: err.message });
    }
  }


}