"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = require("../../utils/validateRequest");
const zod_1 = require("zod");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
const registerSchema = zod_1.z.object({
    body: zod_1.z.object({
        username: zod_1.z.string(),
        email: zod_1.z.string().email(),
        password: zod_1.z.string().min(6),
    }),
});
const loginSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email(),
        password: zod_1.z.string().min(6),
    }),
});
router.post("/register", (0, validateRequest_1.validateRequest)(registerSchema), (0, catchAsync_1.default)(user_controller_1.registerUser));
router.post("/login", (0, validateRequest_1.validateRequest)(loginSchema), (0, catchAsync_1.default)(user_controller_1.loginUser));
exports.UserRoutes = router;
