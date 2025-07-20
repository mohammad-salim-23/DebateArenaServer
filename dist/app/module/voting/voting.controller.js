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
Object.defineProperty(exports, "__esModule", { value: true });
exports.VotingControllers = void 0;
const sendResponse_1 = require("../../utils/sendResponse");
const voting_service_1 = require("./voting.service");
const voteArgument = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    if (!userId) {
        return (0, sendResponse_1.sendResponse)(res, {
            statusCode: 401,
            success: false,
            message: "Unauthorized: userId missing",
            data: null,
        });
    }
    const argument = yield voting_service_1.votingServices.voteArgument(id, userId);
    if (!argument) {
        return (0, sendResponse_1.sendResponse)(res, {
            statusCode: 404,
            success: false,
            message: "Argument not found",
            data: null,
        });
    }
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Vote recorded",
        data: argument,
    });
});
exports.VotingControllers = { voteArgument };
