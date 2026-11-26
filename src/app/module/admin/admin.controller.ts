import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { adminService } from "./admin.service";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";

const getAllAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await adminService.getAllAdmin();
  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Get all admins successfully",
    data: result,
  });
});

const getAdminById = catchAsync(async (req: Request, res: Response) => {
  const adminId = req.params.adminId;
  const result = await adminService.getAdminById(adminId as string);
  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Get admin successfully",
    data: result,
  });
});

const updateAdmin = catchAsync(async (req: Request, res: Response) => {
  const adminId = req.params.adminId;
  const result = await adminService.updateAdmin(adminId as string, req.body);
  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Update admin successfully",
    data: result,
  });
});

const softDeleteAdmin = catchAsync(async (req: Request, res: Response) => {
  const adminId = req.params.adminId;
  const result = await adminService.softDeleteAdmin(adminId as string, req.user);
  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Admin deleted successfully",
    data: result,
  });
});

export const adminController = {
  getAllAdmin,
  getAdminById,
  updateAdmin,
  softDeleteAdmin,
};
