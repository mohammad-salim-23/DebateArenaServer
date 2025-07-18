import Debate from "./debate.model";
import { IDebate } from "./debate.interface";

const createDebate = async (data: IDebate) => {
  const endsAt = new Date();
  endsAt.setHours(endsAt.getHours() + data.duration);
  const debate = new Debate({ ...data, endsAt });
  return await debate.save();
};

const getAllDebates = async () => {
  return await Debate.find().populate("createdBy", "username email");
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
  joinDebate,
};
