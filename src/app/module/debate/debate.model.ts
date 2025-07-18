import { Schema, model } from "mongoose";
import { IDebate } from "./debate.interface";

const debateSchema = new Schema<IDebate>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: [{ type: String }],
    category: { type: String, required: true },
    image: { type: String },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    duration: { type: Number, required: true },
    endsAt: { type: Date, required: true },
    supportSide: [{ type: Schema.Types.ObjectId, ref: "User" }],
    opposeSide: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const Debate = model<IDebate>("Debate", debateSchema);
export default Debate;
