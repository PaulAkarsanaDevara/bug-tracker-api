import { Request, Response } from "express";

export const errorHandler = (err: any, req: Request, res: Response) => {
  console.error(err.message || "Server Error");
  res.status(500).json({ message: err.message || "Internal Server Error" });
};