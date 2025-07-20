import express from "express";
import auth from "../../middlewares/auth";
import catchAsync from "../../utils/catchAsync";
import { VotingControllers } from "./voting.controller";
import { USER_ROLE } from "../../../types/global";

const router = express.Router();

router.post("/:id", auth(USER_ROLE.USER), catchAsync(VotingControllers.voteArgument));

export const VotingRoutes = router;

