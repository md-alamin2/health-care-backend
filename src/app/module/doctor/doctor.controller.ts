import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { doctorService } from "./doctor.service";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";

const getAllDoctor = catchAsync(async (req: Request, res: Response) => {
  const result = await doctorService.getAllDoctor();
  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Get all doctor successfully",
    data: result,
  });
});

const getDoctorById = catchAsync(async (req: Request, res: Response) => {
  const doctorId = req.params.doctorId;
  const result = await doctorService.getDoctorById(doctorId as string);
  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Doctor retrieved successfully",
    data: result,
  });
});

const updateDoctor = catchAsync(async (req: Request, res: Response) => {
  const doctorId = req.params.doctorId;
  const result = await doctorService.updateDoctor(doctorId as string, req.body);
  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Doctor updated successfully",
    data: result,
  });
});

const softDeleteDoctor = catchAsync(async (req: Request, res: Response) => {
  const doctorId = req.params.doctorId;
  const result = await doctorService.softDeleteDoctor(doctorId as string);
  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Doctor deleted successfully",
    data: result,
  });
});

export const doctorController = {
  getAllDoctor,
  getDoctorById,
  updateDoctor,
  softDeleteDoctor
};
