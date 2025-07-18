import { Request, Response } from "express";
import User from "./user.model";
import bcrypt from "bcryptjs";

export const registerUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, email, password: hashedPassword });
  await user.save();
  res.status(201).json({ message: "User registered", data: user });
};
