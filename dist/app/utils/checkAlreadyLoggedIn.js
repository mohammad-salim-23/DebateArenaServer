"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAlreadyLoggedIn = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const checkAlreadyLoggedIn = (req, res, next) => {
    var _a, _b;
    const token = ((_a = req.cookies) === null || _a === void 0 ? void 0 : _a.accessToken) || ((_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.split(" ")[1]);
    if (!token) {
        return next(); // no token,proceed to login
    }
    try {
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "defaultsecret");
        // If token is valid, user is already logged in
        return res.status(400).json({ message: "You are already logged in" });
    }
    catch (err) {
        // Token invalid or expired, proceed to login
        next();
    }
};
exports.checkAlreadyLoggedIn = checkAlreadyLoggedIn;
