import { inject, injectable } from "tsyringe";
import { BugService } from "./bug.service";
import { Request, Response } from 'express';

@injectable()
export class BugController {
  constructor(@inject('BugService') private bugService: BugService ) {}

  async getBugs(req: Request, res: Response) {
    try {
      const { page, limit, sort, status, priority, search } = req.query;
      const results = await this.bugService.findAll(
        Number(page) || 1,
        Number(limit) || 10,
        (sort as "asc" | "desc") || "desc",
        status as string,
        priority as string,
        search as string
      );

      res.json(results);
    } catch (err: any) {
       res.status(500).json({ message: err.message || 'Internal server error' })
    }
  }

  async getBugById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await this.bugService.findById(id);
  
      res.json({ data: result });
    } catch (err: any) {
      res.status(500).json({ message: err.message || 'Internal server error' })
    }
  }

  async create(req: Request, res: Response) {
    try {
  
      const result = await this.bugService.createBug(req.body, req.file);
      res.status(201).json({  message: "Bug created" , data: result });
    } catch (err: any) {
      res.status(500).json({ message: err.message || 'Internal server error' })
    }
  }

  async assign(req: Request, res: Response) {
      try {
        const { id } = req.params;
        const result =  await this.bugService.assignBug(id, req.body);
        res.json({ message: "Bug assigned successfully", data: result });
      } catch (err: any) {
        res.status(500).json({ message: err.message || 'Internal server error' })
      }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await this.bugService.updateBug(id, req.body);
      res.json({ message: "Bug updated", data: result });
    } catch (err: any) {
      res.status(500).json({ message: err.message || 'Internal server error' })
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await this.bugService.deleteBug(id);

      res.json({ message: "Bug deleted" });

    } catch (err: any) {
      res.status(500).json({ message: err.message || 'Internal server error' })
    }
  }

}
