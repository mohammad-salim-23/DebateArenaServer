import { Request, Response } from "express";
import { ArgumentServices } from "./argument.service";
import { sendResponse } from "../../utils/sendResponse";

const createArgument = async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  const data = { ...req.body, userId };
  const argument = await ArgumentServices.createArgument(data);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Argument created",
    data: argument,
  });
};

const getArgumentsByDebate = async (req: Request, res: Response) => {
  const { debateId } = req.params;
  const argumentsData = await ArgumentServices.getArgumentsByDebate(debateId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Arguments fetched",
    data: argumentsData,
  });
};

const updateArgument = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user?.userId;
  const { content } = req.body;

  if (!userId) {
    return sendResponse(res, {
      statusCode: 401,
      success: false,
      message: "Unauthorized: userId is missing",
      data: null,
    });
  }

  const result = await ArgumentServices.updateArgument(id, userId, content);
  if (!result) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: "Argument not found",
      data: null,
    });
  }
  if (typeof result === "string") {
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: result,
      data: null,
    });
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Argument updated",
    data: result,
  });
};

const deleteArgument = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user?.userId;

  if (!userId) {
    return sendResponse(res, {
      statusCode: 401,
      success: false,
      message: "Unauthorized: userId is missing",
      data: null,
    });
  }

  const result = await ArgumentServices.deleteArgument(id, userId);
  if (!result) {
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
    message: "Argument deleted",
    data: null,
  });
};

export const ArgumentControllers = {
  createArgument,
  getArgumentsByDebate,
  updateArgument,
  deleteArgument,
};
