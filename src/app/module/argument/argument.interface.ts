import { Types } from "mongoose";

export interface IArgument {
  _id?: string | Types.ObjectId;
  debateId: Types.ObjectId;
  userId: Types.ObjectId;
  side: "support" | "oppose";
  content: string;
  votes: number;
   votedUsers:Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}
