import express from "express";
import { validateRequest } from "../../utils/validateRequest";
import { z } from "zod";
import catchAsync from "../../utils/catchAsync";
import { loginUser, registerUser } from "./user.controller";
const router = express.Router();
const registerSchema = z.object({
  body: z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  }),
});
const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6),
  }),
});

router.post(
  "/register",
  validateRequest(registerSchema),
  catchAsync(registerUser)
);
router.post(
  "/login",
  validateRequest(loginSchema),
  catchAsync(loginUser)
);
export const UserRoutes = router;