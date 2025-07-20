import Debate from "./debate.model";
import { IDebate } from "./debate.interface";
import mongoose from "mongoose";

const createDebate = async (data: IDebate) => {
  const endsAt = new Date();
  endsAt.setHours(endsAt.getHours() + data.duration); 

  // Convert createdBy to ObjectId if it's a string
  const createdByObjectId = new mongoose.Types.ObjectId(data.createdBy);

  const debate = new Debate({ ...data, createdBy: createdByObjectId, endsAt });
  return await debate.save();
};

const getAllDebates = async () => {
  return await Debate.find().populate("createdBy", "username email");
};

const getDebateById = async (debateId: string) => {
  return await Debate.findById(debateId).populate("createdBy", "username email");
};
const joinDebate = async (debateId: string, userId: string, side: "support" | "oppose") => {
  const debate = await Debate.findById(debateId);
  if (!debate) return null;

  if (side === "support") {
    if (debate.opposeSide.includes(userId as any)) return "Already joined opposite side";
    if (!debate.supportSide.includes(userId as any)) {
      debate.supportSide.push(userId as any);
    }
  } else {
    if (debate.supportSide.includes(userId as any)) return "Already joined opposite side";
    if (!debate.opposeSide.includes(userId as any)) {
      debate.opposeSide.push(userId as any);
    }
  }

  await debate.save();
  return debate;
};

export const DebateServices = {
  createDebate,
  getAllDebates,
  getDebateById,
  joinDebate,
};
