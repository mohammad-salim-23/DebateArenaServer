import { Request, Response, NextFunction } from "express";

const bannedWords = ["stupid", "idiot", "dumb"];

export const toxicWordCheck = (req: Request, res: Response, next: NextFunction) => {
  const content = req.body.content;
  if (!content) return next();

  const found = bannedWords.find(word => content.toLowerCase().includes(word));
  if (found) {
     res.status(400).json({
      statusCode: 400,
      success: false,
      message: `Inappropriate word detected: ${found}`,
      data: null,
    });
    return;
  }

  next();
};
