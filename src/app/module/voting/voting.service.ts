import mongoose from "mongoose";
import Argument from "../argument/argument.model";
import Debate from "../debate/debate.model";

const voteArgument = async (id: string, userId: string) => {
  const argument = await Argument.findById(id);
  if (!argument) throw new Error("Argument not found");

  const debate = await Debate.findById(argument.debateId);
  if (!debate) throw new Error("Debate not found");

  if (new Date() > debate.endsAt) {
    throw new Error("Debate is closed. Cannot vote.");
  }

  const userObjectId = new mongoose.Types.ObjectId(userId);

  // Check if user already voted
  if (argument.votedUsers.some(voterId => voterId.equals(userObjectId))) {
    throw new Error("You have already voted for this argument.");
  }

  argument.votes += 1;
  argument.votedUsers.push(userObjectId);

  await argument.save();
  return argument;
};
export const votingServices = {voteArgument};
