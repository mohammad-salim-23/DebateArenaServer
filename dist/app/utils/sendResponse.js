"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
const sendResponse = (res, result) => {
    res.status(result.statusCode).json({
        success: result.success,
        message: result.message,
        meta: result.meta,
        data: result.data,
    });
};
exports.sendResponse = sendResponse;
