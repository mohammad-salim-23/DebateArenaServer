import express from "express";
import auth from "../../middlewares/auth";
import catchAsync from "../../utils/catchAsync";
import { DebateControllers } from "./debate.controller";
import { USER_ROLE } from "../../../types/global";

const router = express.Router();

router.post(
  "/",
  auth(USER_ROLE.USER),
  catchAsync(DebateControllers.createDebate)
);


router.get(
  "/",
  auth(USER_ROLE.USER),
  catchAsync(DebateControllers.getAllDebates)
);

router.post(
  "/join/:id",
  auth(USER_ROLE.USER),
  catchAsync(DebateControllers.joinDebate)
);

export const DebateRoutes = router;
