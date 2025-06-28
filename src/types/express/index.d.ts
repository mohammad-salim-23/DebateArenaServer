import { Request } from "express";

declare module "express" {
  export interface Request {
    user?: {
      userId: string;
      username?: string;
      role?: string;
      email?:string;
    };
  }
}
export interface AuthRequest extends Request {
  user: {
    userId: string;
    username?: string;
    role?: string;
    email?:string;
  };
}