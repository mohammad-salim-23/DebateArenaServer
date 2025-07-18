import { Request, Response } from "express";

import { sendResponse } from "../../utils/sendResponse";
import { ScoreboardServices } from "./scoreBoard.service";

const getScoreboard = async (req: Request, res: Response) => {
  const filter = (req.query.filter as "weekly" | "monthly" | "all") || "all";

  const scoreboard = await ScoreboardServices.getScoreboard(filter);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Scoreboard fetched successfully",
    data: scoreboard,
  });
};

export const ScoreboardControllers = {
  getScoreboard,
};
