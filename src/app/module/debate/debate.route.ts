import express from "express";
import auth from "../../middlewares/auth";
import catchAsync from "../../utils/catchAsync";
import { DebateControllers } from "./debate.controller";
import { USER_ROLE } from "../../../types/global";
import { upload } from "../../../middleware/upload";

const router = express.Router();

router.post(
  "/",
  auth(USER_ROLE.USER),
  
  (DebateControllers.createDebate)
);


router.get(
  "/",

  catchAsync(DebateControllers.getAllDebates)
);
router.get(
  "/:id",
 
  catchAsync(DebateControllers.getDebateById)
);
router.post(
  "/join/:id",
  auth(USER_ROLE.USER),
  catchAsync(DebateControllers.joinDebate)
);

export const DebateRoutes = router;
