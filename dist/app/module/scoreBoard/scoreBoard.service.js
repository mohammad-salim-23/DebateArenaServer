"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScoreboardServices = void 0;
const argument_model_1 = __importDefault(require("../argument/argument.model"));
const getScoreboard = (filter) => __awaiter(void 0, void 0, void 0, function* () {
    let matchStage = {};
    const now = new Date();
    if (filter === "weekly") {
        const lastWeek = new Date();
        lastWeek.setDate(now.getDate() - 7);
        matchStage.createdAt = { $gte: lastWeek };
    }
    else if (filter === "monthly") {
        const lastMonth = new Date();
        lastMonth.setMonth(now.getMonth() - 1);
        matchStage.createdAt = { $gte: lastMonth };
    }
    const data = yield argument_model_1.default.aggregate([
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
});
exports.ScoreboardServices = {
    getScoreboard,
};
