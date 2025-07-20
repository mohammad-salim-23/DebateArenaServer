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
exports.ArgumentControllers = void 0;
const argument_service_1 = require("./argument.service");
const sendResponse_1 = require("../../utils/sendResponse");
const createArgument = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const data = Object.assign(Object.assign({}, req.body), { userId });
    const argument = yield argument_service_1.ArgumentServices.createArgument(data);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 201,
        success: true,
        message: "Argument created",
        data: argument,
    });
});
const getArgumentsByDebate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { debateId } = req.params;
    const argumentsData = yield argument_service_1.ArgumentServices.getArgumentsByDebate(debateId);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Arguments fetched",
        data: argumentsData,
    });
});
const updateArgument = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const { content } = req.body;
    if (!userId) {
        return (0, sendResponse_1.sendResponse)(res, {
            statusCode: 401,
            success: false,
            message: "Unauthorized: userId is missing",
            data: null,
        });
    }
    const result = yield argument_service_1.ArgumentServices.updateArgument(id, userId, content);
    if (!result) {
        return (0, sendResponse_1.sendResponse)(res, {
            statusCode: 404,
            success: false,
            message: "Argument not found",
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
        message: "Argument updated",
        data: result,
    });
});
const deleteArgument = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    if (!userId) {
        return (0, sendResponse_1.sendResponse)(res, {
            statusCode: 401,
            success: false,
            message: "Unauthorized: userId is missing",
            data: null,
        });
    }
    const result = yield argument_service_1.ArgumentServices.deleteArgument(id, userId);
    if (!result) {
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
        message: "Argument deleted",
        data: null,
    });
});
exports.ArgumentControllers = {
    createArgument,
    getArgumentsByDebate,
    updateArgument,
    deleteArgument,
};
