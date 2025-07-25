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
exports.ScoreboardControllers = void 0;
const sendResponse_1 = require("../../utils/sendResponse");
const scoreBoard_service_1 = require("./scoreBoard.service");
const getScoreboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = req.query.filter || "all";
    const scoreboard = yield scoreBoard_service_1.ScoreboardServices.getScoreboard(filter);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Scoreboard fetched successfully",
        data: scoreboard,
    });
});
exports.ScoreboardControllers = {
    getScoreboard,
};
