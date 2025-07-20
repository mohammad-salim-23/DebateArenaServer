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
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const user_model_1 = __importDefault(require("../module/user/user.model"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const auth = (...requiredRoles) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw new AppError_1.default(401, "You are not authorized.");
        }
        const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;
        let decoded = null;
        try {
            decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_secret);
        }
        catch (err) {
            try {
                decoded = jsonwebtoken_1.default.verify(token, process.env.NEXTAUTH_SECRET);
            }
            catch (err2) {
                throw new AppError_1.default(401, "You are not authorized. Invalid or expired token.");
            }
        }
        const role = decoded.role;
        if (requiredRoles.length > 0 && !requiredRoles.includes(role)) {
            throw new AppError_1.default(401, "You are not authorized. Invalid role.");
        }
        const userId = decoded.userId || decoded.id || decoded.sub;
        if (!userId) {
            throw new AppError_1.default(401, "User ID missing in token.");
        }
        const user = yield user_model_1.default.findById(userId);
        if (!user) {
            throw new AppError_1.default(401, "User not found.");
        }
        req.user = {
            userId: userId,
            email: decoded.email || decoded.userEmail || user.email,
            username: decoded.username || user.username,
            role: role,
        };
        next();
    }));
};
exports.default = auth;
