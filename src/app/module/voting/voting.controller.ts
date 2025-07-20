import { Request, Response } from "express";

import { sendResponse } from "../../utils/sendResponse";
import { votingServices } from "./voting.service";

const voteArgument = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user?.userId;

  if (!userId) {
    return sendResponse(res, {
      statusCode: 401,
      success: false,
      message: "Unauthorized: userId missing",
      data: null,
    });
  }

  const argument = await votingServices.voteArgument(id, userId);
  if (!argument) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: "Argument not found",
      data: null,
    });
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Vote recorded",
    data: argument,
  });
};

export const VotingControllers = { voteArgument };
