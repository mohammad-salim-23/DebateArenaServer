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
exports.loginUser = exports.registerUser = void 0;
const user_model_1 = __importDefault(require("./user.model"));
const config_1 = __importDefault(require("../../config"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    const user = new user_model_1.default({ username, email, password: hashedPassword });
    yield user.save();
    res.status(201).json({ message: "User registered", data: user });
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    //Find user by email
    const user = yield user_model_1.default.findOne({ email });
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }
    const isMatch = yield bcryptjs_1.default.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({
            success: false,
            message: "Invalid credentials",
        });
    }
    //Generate JWT token
    const token = jsonwebtoken_1.default.sign({
        userId: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
    }, config_1.default.jwt_secret, { expiresIn: "1d" });
    res.status(200).json({
        success: true,
        message: "Login successful",
        data: {
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
            },
        },
    });
});
exports.loginUser = loginUser;
