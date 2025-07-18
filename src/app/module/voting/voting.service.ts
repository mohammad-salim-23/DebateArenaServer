import Argument from "../argument/argument.model";
import Debate from "../debate/debate.model";


const voteArgument = async (id: string, userId: string) => {
  const argument = await Argument.findById(id);
  if (!argument) return null;

  const debate = await Debate.findById(argument.debateId);
  if (!debate) throw new Error("Debate not found");

  if (new Date() > debate.endsAt) {
    throw new Error("Debate is closed. Cannot vote.");
  }

  // Here you can check if the user already voted if you implement a separate votes collection
  argument.votes += 1;
  await argument.save();
  return argument;
};

export const VotingServices = { voteArgument };
