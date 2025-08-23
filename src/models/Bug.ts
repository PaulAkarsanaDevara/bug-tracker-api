import mongoose, { Schema } from "mongoose";
import { IAttachment, IBug } from "../interfaces/bug.interface";
import User from "./User";

const AttachmentSchema = new Schema<IAttachment>(
  {
    filename: { type: String, required: true },
    url: { type: String, required: true },
    mimetype: { type: String, required: true },
    size: { type: Number, required: true },
  },
  { _id: false }
);

const bugSchema = new Schema<IBug>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
  status: { type: String, enum: ["open", "in-progress", "resolved"], default: "open" },
  label: { type: [String] , required: true,  validate: [(val: string[]) => val.length > 0, "Minimal 1 label wajib diisi"], },
  attachments: { type: [AttachmentSchema], default: [] },
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  assignedTo: { type: Schema.Types.ObjectId, ref: "User" },
  history: [
    {
      status: { type: String },
      updatedBy: { type: Schema.Types.ObjectId, ref: "User" },
      updatedAt: { type: Date, default: Date.now }
    }
  ]
}, { timestamps: true });


// Middleware setelah bug dibuat → push bugId ke User.bugs
bugSchema.post("save", async function (doc) {
  if(doc.assignedTo) {
   await User.findByIdAndUpdate(doc.assignedTo, {
        $addToSet: { history: doc._id } 
      })
  }
  await User.findByIdAndUpdate(doc.createdBy, { $push: { history: doc._id } });
});


export default mongoose.model<IBug>("Bug", bugSchema);