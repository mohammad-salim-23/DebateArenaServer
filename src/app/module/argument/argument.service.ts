import Argument from "./argument.model";
import { IArgument } from "./argument.interface";
import Debate from "../debate/debate.model";

const createArgument = async (data: IArgument) => {
   const debate = await Debate.findById(data.debateId);
if(!debate) throw new Error("Debate not found");
if(new Date()> debate.endsAt){
  throw new Error("Debate is closed. cannot post arguments");
}
  const argument = new Argument(data);
  return await argument.save();
};

const getArgumentsByDebate = async (debateId: string) => {
  return await Argument.find({ debateId })
    .populate("userId", "username email")
    .sort({ createdAt: 1 });
};

const updateArgument = async (id: string, userId: string, content: string) => {
  const argument = await Argument.findOne({ _id: id, userId });
  if (!argument) return null;

  const fiveMin = 5 * 60 * 1000;
  const now = new Date();
  if (now.getTime() - argument.createdAt!.getTime() > fiveMin) {
    return "argument time expired";
  }

  argument.content = content;
  await argument.save();
  return argument;
};

const deleteArgument = async (id: string, userId: string) => {
  const argument = await Argument.findOne({ _id: id, userId });
  if (!argument) return null;


  await Argument.deleteOne({ _id: id });
  return true;
};

export const ArgumentServices = {
  createArgument,
  getArgumentsByDebate,
  updateArgument,
  deleteArgument,
};
