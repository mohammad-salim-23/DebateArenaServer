
import mongoose from "mongoose";
import Argument from "../argument/argument.model";

const getScoreboard = async (filter: "weekly" | "monthly" | "all") => {
  let matchStage: Record<string, any> = {};

  const now = new Date();
  if (filter === "weekly") {
    const lastWeek = new Date();
    lastWeek.setDate(now.getDate() - 7);
    matchStage.createdAt = { $gte: lastWeek };
  } else if (filter === "monthly") {
    const lastMonth = new Date();
    lastMonth.setMonth(now.getMonth() - 1);
    matchStage.createdAt = { $gte: lastMonth };
  }

  const data = await Argument.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: "$userId",
        totalVotes: { $sum: "$votes" },
        debatesParticipated: { $addToSet: "$debateId" },
      },
    },
    {
      $project: {
        userId: "$_id",
        totalVotes: 1,
        totalDebates: { $size: "$debatesParticipated" },
        _id: 0,
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },
    { $unwind: "$user" },
    {
      $project: {
        userId: 1,
        username: "$user.username",
        totalVotes: 1,
        totalDebates: 1,
      },
    },
    { $sort: { totalVotes: -1 } }, // top debaters first
  ]);

  return data;
};

export const ScoreboardServices = {
  getScoreboard,
};
