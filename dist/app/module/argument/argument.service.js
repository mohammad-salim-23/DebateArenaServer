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
exports.ArgumentServices = void 0;
const argument_model_1 = __importDefault(require("./argument.model"));
const debate_model_1 = __importDefault(require("../debate/debate.model"));
const createArgument = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const debate = yield debate_model_1.default.findById(data.debateId);
    if (!debate)
        throw new Error("Debate not found");
    if (new Date() > debate.endsAt) {
        throw new Error("Debate is closed. cannot post arguments");
    }
    const argument = new argument_model_1.default(data);
    return yield argument.save();
});
const getArgumentsByDebate = (debateId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield argument_model_1.default.find({ debateId })
        .populate("userId", "username email")
        .sort({ createdAt: 1 });
});
const updateArgument = (id, userId, content) => __awaiter(void 0, void 0, void 0, function* () {
    const argument = yield argument_model_1.default.findOne({ _id: id, userId });
    if (!argument)
        return null;
    const fiveMin = 5 * 60 * 1000;
    const now = new Date();
    if (now.getTime() - argument.createdAt.getTime() > fiveMin) {
        return "argument time expired";
    }
    argument.content = content;
    yield argument.save();
    return argument;
});
const deleteArgument = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const argument = yield argument_model_1.default.findOne({ _id: id, userId });
    if (!argument)
        return null;
    yield argument_model_1.default.deleteOne({ _id: id });
    return true;
});
exports.ArgumentServices = {
    createArgument,
    getArgumentsByDebate,
    updateArgument,
    deleteArgument,
};
