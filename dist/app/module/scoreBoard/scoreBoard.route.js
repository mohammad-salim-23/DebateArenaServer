"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScoreboardRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const global_1 = require("../../../types/global");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const scoreBoard_controller_1 = require("./scoreBoard.controller");
const router = express_1.default.Router();
router.get("/", (0, auth_1.default)(global_1.USER_ROLE.USER), (0, catchAsync_1.default)(scoreBoard_controller_1.ScoreboardControllers.getScoreboard));
exports.ScoreboardRoutes = router;
