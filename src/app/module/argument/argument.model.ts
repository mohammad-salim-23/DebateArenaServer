import { Schema, model } from "mongoose";
import { IArgument } from "./argument.interface";

const argumentSchema = new Schema<IArgument>(
  {
    debateId: { type: Schema.Types.ObjectId, ref: "Debate", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    side: { type: String, enum: ["support", "oppose"], required: true },
    content: { type: String, required: true },
    votes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Argument = model<IArgument>("Argument", argumentSchema);
export default Argument;
