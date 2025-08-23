import { Request, Response } from 'express';
import { inject, injectable } from "tsyringe";
import { UserService } from "./user.service";

@injectable()
export class UserController {
  constructor(@inject("UserService") private userService: UserService) {}

  async getUsers(req: Request, res: Response) {
    const { page, limit, search , role} = req.query;
    try {
      const data = await this.userService.findAll(
        Number(page) || 1,
        Number(limit) || 10,
        search as string,
        role as string
      );
      res.json({ status: "OK", message: "Get All Users", data })
      
    } catch (err: any) {
      res.status(500).json({ message: err.message || 'Internal server error'  });
    }
  }

  async getUserById(req: Request, res: Response) {
    const user = await this.userService.findById(req.params.id);
    if(!user)  res.status(404).json({  status: "FAILED", message: "User not found" })
    res.json({ message: "Get User ID", data: user })
  }

  async create(req: Request, res: Response) {
    try {
      const data = await this.userService.createUser(req.body);
      res.status(201).json({ status: "CREATED", message: "User created", data  });
    } catch (err) {
      res.status(400).json({ status: 'ERROR', message: err.message })
    }
  }

  async update(req: Request, res: Response) {
    try {
      const userId = req.params.id;
      if(!userId)  res.status(404).json({  status: "FAILED", message: "User not found" });

      const user = await this.userService.findById(req.params.id);
      if(!user) res.status(404).json({  status: "FAILED", message: "User not found" })
      
      const result = await this.userService.updateUser(userId, req.body);

      res.json({ status: "OK", message: "User updated",  data: result });

    } catch (err) {
      res.status(400).json({ status: 'ERROR', message: "Failed to update user" })
    }
  }

  async delete(req: Request, res: Response) {

      try {
        const { id } = req.params;

        if(!id) return res.status(404).json({ status: 'ERROR', message: "ID not found" });

        await this.userService.deleteUser(id);
        res.json({ status: "OK", message: "User deleted" });  
    
      } catch (err) {
        res.status(400).json({ status: 'ERROR', message: err.message })
      }

    }

 
}