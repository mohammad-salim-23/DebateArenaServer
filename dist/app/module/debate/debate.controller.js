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
exports.DebateControllers = void 0;
const debate_service_1 = require("./debate.service");
const sendResponse_1 = require("../../utils/sendResponse");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const createDebate = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    // Parse tags to array
    const tagsArray = req.body.tags
        ? req.body.tags.split(",").map((t) => t.trim())
        : [];
    const duration = parseFloat(req.body.duration);
    if (isNaN(duration) || duration <= 0) {
        return (0, sendResponse_1.sendResponse)(res, {
            statusCode: 400,
            success: false,
            message: "Invalid duration provided",
            data: null,
        });
    }
    const data = Object.assign(Object.assign({}, req.body), { createdBy: userId, tags: tagsArray, duration });
    const debate = yield debate_service_1.DebateServices.createDebate(data);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 201,
        success: true,
        message: "Debate created",
        data: debate,
    });
}));
const getAllDebates = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const debates = yield debate_service_1.DebateServices.getAllDebates();
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "All debates fetched",
        data: debates,
    });
});
const getDebateById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const debate = yield debate_service_1.DebateServices.getDebateById(id);
    if (!debate) {
        return (0, sendResponse_1.sendResponse)(res, {
            statusCode: 404,
            success: false,
            message: "Debate not found",
            data: null,
        });
    }
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Debate fetched successfully",
        data: debate,
    });
});
const joinDebate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    const { side } = req.body;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    if (!userId) {
        return (0, sendResponse_1.sendResponse)(res, {
            statusCode: 401,
            success: false,
            message: "Unauthorized: userId missing",
            data: null,
        });
    }
    const result = yield debate_service_1.DebateServices.joinDebate(id, userId, side);
    if (!result) {
        return (0, sendResponse_1.sendResponse)(res, {
            statusCode: 404,
            success: false,
            message: "Debate not found",
            data: null,
        });
    }
    if (typeof result === "string") {
        return (0, sendResponse_1.sendResponse)(res, {
            statusCode: 400,
            success: false,
            message: result,
            data: null,
        });
    }
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Joined debate",
        data: result,
    });
});
exports.DebateControllers = {
    createDebate,
    getAllDebates,
    joinDebate,
    getDebateById
};
