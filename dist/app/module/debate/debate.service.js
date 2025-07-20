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
exports.DebateServices = void 0;
const debate_model_1 = __importDefault(require("./debate.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const createDebate = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const endsAt = new Date();
    endsAt.setHours(endsAt.getHours() + data.duration);
    // Convert createdBy to ObjectId if it's a string
    const createdByObjectId = new mongoose_1.default.Types.ObjectId(data.createdBy);
    const debate = new debate_model_1.default(Object.assign(Object.assign({}, data), { createdBy: createdByObjectId, endsAt }));
    return yield debate.save();
});
const getAllDebates = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield debate_model_1.default.find().populate("createdBy", "username email");
});
const getDebateById = (debateId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield debate_model_1.default.findById(debateId).populate("createdBy", "username email");
});
const joinDebate = (debateId, userId, side) => __awaiter(void 0, void 0, void 0, function* () {
    const debate = yield debate_model_1.default.findById(debateId);
    if (!debate)
        return null;
    if (side === "support") {
        if (debate.opposeSide.includes(userId))
            return "Already joined opposite side";
        if (!debate.supportSide.includes(userId)) {
            debate.supportSide.push(userId);
        }
    }
    else {
        if (debate.supportSide.includes(userId))
            return "Already joined opposite side";
        if (!debate.opposeSide.includes(userId)) {
            debate.opposeSide.push(userId);
        }
    }
    yield debate.save();
    return debate;
});
exports.DebateServices = {
    createDebate,
    getAllDebates,
    getDebateById,
    joinDebate,
};
