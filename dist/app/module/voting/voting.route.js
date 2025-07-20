"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VotingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const voting_controller_1 = require("./voting.controller");
const global_1 = require("../../../types/global");
const router = express_1.default.Router();
router.post("/:id", (0, auth_1.default)(global_1.USER_ROLE.USER), (0, catchAsync_1.default)(voting_controller_1.VotingControllers.voteArgument));
exports.VotingRoutes = router;
