import express from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../../../types/global";
import catchAsync from "../../utils/catchAsync";
import { ScoreboardControllers } from "./scoreBoard.controller";

const router = express.Router();

router.get("/", auth(USER_ROLE.USER), catchAsync(ScoreboardControllers.getScoreboard));

export const ScoreboardRoutes = router;
