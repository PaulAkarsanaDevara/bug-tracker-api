import mongoose, { Document } from "mongoose";

export  interface IAttachment {
  filename: string;
  url: string;
  mimetype: string;
  size: number;
}

export interface IBug extends Document {
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  status: "open" | "in-progress" | "resolved";
  label: string[];
  attachments: IAttachment[];
  createdBy: mongoose.Types.ObjectId;
  assignedTo?: mongoose.Types.ObjectId;
  history: {
    status: string;
    updatedBy: mongoose.Types.ObjectId;
    updatedAt: Date;
  }[];
}