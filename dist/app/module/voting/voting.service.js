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
exports.votingServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const argument_model_1 = __importDefault(require("../argument/argument.model"));
const debate_model_1 = __importDefault(require("../debate/debate.model"));
const voteArgument = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const argument = yield argument_model_1.default.findById(id);
    if (!argument)
        throw new Error("Argument not found");
    const debate = yield debate_model_1.default.findById(argument.debateId);
    if (!debate)
        throw new Error("Debate not found");
    if (new Date() > debate.endsAt) {
        throw new Error("Debate is closed. Cannot vote.");
    }
    const userObjectId = new mongoose_1.default.Types.ObjectId(userId);
    // Check if user already voted
    if (argument.votedUsers.some(voterId => voterId.equals(userObjectId))) {
        throw new Error("You have already voted for this argument.");
    }
    argument.votes += 1;
    argument.votedUsers.push(userObjectId);
    yield argument.save();
    return argument;
});
exports.votingServices = { voteArgument };
