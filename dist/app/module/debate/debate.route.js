"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebateRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const debate_controller_1 = require("./debate.controller");
const global_1 = require("../../../types/global");
const upload_1 = require("../../../middleware/upload");
const router = express_1.default.Router();
router.post("/", (0, auth_1.default)(global_1.USER_ROLE.USER), upload_1.upload.single("image"), (debate_controller_1.DebateControllers.createDebate));
router.get("/", (0, catchAsync_1.default)(debate_controller_1.DebateControllers.getAllDebates));
router.get("/:id", (0, catchAsync_1.default)(debate_controller_1.DebateControllers.getDebateById));
router.post("/join/:id", (0, auth_1.default)(global_1.USER_ROLE.USER), (0, catchAsync_1.default)(debate_controller_1.DebateControllers.joinDebate));
exports.DebateRoutes = router;
