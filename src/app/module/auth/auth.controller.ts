import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { authService } from "./auth.service";
import { sendResponse } from "../../shared/sendResponse";

const registerPatient = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await authService.registerPatient(payload);
  sendResponse(res, {
    httpStatusCode: 201,
    success: true,
    message: "Patient registered successfully",
    data: result,
  });
});


const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.loginUser(
    req.body,
    new Headers(req.headers as HeadersInit)
  );

  const setCookie = result.headers.get("set-cookie");

  if (setCookie) {
    res.setHeader("Set-Cookie", setCookie);
  }

  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "User logged in successfully",
    data: result.data,
  });
});

export const authController = {
  registerPatient,
  loginUser,
};
