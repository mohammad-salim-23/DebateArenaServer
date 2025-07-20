"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globalErrorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({
        success: false,
        message,
        errorDetails: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
};
exports.default = globalErrorHandler;
