import express from "express";
import auth from "../../middlewares/auth";
import catchAsync from "../../utils/catchAsync";
import { ArgumentControllers } from "./argument.controller";
import { USER_ROLE } from "../../../types/global";

const router = express.Router();

router.post("/", auth(USER_ROLE.USER), catchAsync(ArgumentControllers.createArgument));
router.get("/:debateId", auth(USER_ROLE.USER), catchAsync(ArgumentControllers.getArgumentsByDebate));
router.put("/:id", auth(USER_ROLE.USER), catchAsync(ArgumentControllers.updateArgument));
router.delete("/:id", auth(USER_ROLE.USER), catchAsync(ArgumentControllers.deleteArgument));

export const ArgumentRoutes = router;
