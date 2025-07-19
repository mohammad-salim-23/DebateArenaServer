import { Request, Response } from "express";
import { DebateServices } from "./debate.service";
import { sendResponse } from "../../utils/sendResponse";
const createDebate = async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  let imageUrl = "";
  if (req.file) {
    imageUrl = `${req.protocol}://${req.get("host")}/uploads/debates/${req.file.filename}`;
  }

  const data = { ...req.body, createdBy: userId, image: imageUrl };
  const debate = await DebateServices.createDebate(data);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Debate created",
    data: debate,
  });
};

const getAllDebates = async (req: Request, res: Response) => {
  const debates = await DebateServices.getAllDebates();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "All debates fetched",
    data: debates,
  });
};

const joinDebate = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { side } = req.body;
  const userId = req.user?.userId;

  if (!userId) {
    return sendResponse(res, {
      statusCode: 401,
      success: false,
      message: "Unauthorized: userId missing",
      data: null,
    });
  }

  const result = await DebateServices.joinDebate(id, userId, side);
  if (!result) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: "Debate not found",
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
    message: "Joined debate",
    data: result,
  });
};

export const DebateControllers = {
  createDebate,
  getAllDebates,
  joinDebate,
};
