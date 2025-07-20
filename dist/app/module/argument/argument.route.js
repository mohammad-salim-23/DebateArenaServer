"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArgumentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const argument_controller_1 = require("./argument.controller");
const global_1 = require("../../../types/global");
const toxicWordCheck_1 = require("../../middlewares/toxicWordCheck");
const router = express_1.default.Router();
router.post("/", (0, auth_1.default)(global_1.USER_ROLE.USER), toxicWordCheck_1.toxicWordCheck, (0, catchAsync_1.default)(argument_controller_1.ArgumentControllers.createArgument));
router.get("/:debateId", (0, auth_1.default)(global_1.USER_ROLE.USER), (0, catchAsync_1.default)(argument_controller_1.ArgumentControllers.getArgumentsByDebate));
router.put("/:id", (0, auth_1.default)(global_1.USER_ROLE.USER), toxicWordCheck_1.toxicWordCheck, (0, catchAsync_1.default)(argument_controller_1.ArgumentControllers.updateArgument));
router.delete("/:id", (0, auth_1.default)(global_1.USER_ROLE.USER), (0, catchAsync_1.default)(argument_controller_1.ArgumentControllers.deleteArgument));
exports.ArgumentRoutes = router;
