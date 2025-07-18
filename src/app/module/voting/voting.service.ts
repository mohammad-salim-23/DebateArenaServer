import Argument from "../argument/argument.model";


const voteArgument = async (id: string, userId: string) => {
  const argument = await Argument.findById(id);
  if (!argument) return null;

  // Here you can check if the user already voted if you implement a separate votes collection
  argument.votes += 1;
  await argument.save();
  return argument;
};

export const VotingServices = { voteArgument };
