import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import User from "../module/user/user.model";
import AppError from "../errors/AppError";

const auth = (...requiredRoles: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new AppError(401, "You are not authorized.");
    }

    const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;

    let decoded: JwtPayload | null = null;

    try {
      decoded = jwt.verify(token, config.jwt_secret as string) as JwtPayload;
    } catch (err) {
  
      try {
        decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET as string) as JwtPayload;
      } catch (err2) {
        throw new AppError(401, "You are not authorized. Invalid or expired token.");
      }
    }

    const role = decoded.role;

    if (requiredRoles.length > 0 && !requiredRoles.includes(role)) {
      throw new AppError(401, "You are not authorized. Invalid role.");
    }

    const userId = decoded.userId || decoded.id || decoded.sub;

    if (!userId) {
      throw new AppError(401, "User ID missing in token.");
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new AppError(401, "User not found.");
    }

    req.user = {
      userId: userId,
      email: decoded.email || decoded.userEmail || user.email,
      username: decoded.username || user.username,
      role: role,
    };

    next();
  });
};

export default auth;
