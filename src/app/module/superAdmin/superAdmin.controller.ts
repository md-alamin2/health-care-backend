import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { superAdminService } from "./superAdmin.service";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";

const getAllSuperAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await superAdminService.getAllSuperAdmin();
  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Get all admins successfully",
    data: result,
  });
});

const getSuperAdminById = catchAsync(async (req: Request, res: Response) => {
  const superAdminId = req.params.superAdminId;
  const result = await superAdminService.getSuperAdminById(
    superAdminId as string,
  );
  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Get super admin successfully",
    data: result,
  });
});

const updateSuperAdmin = catchAsync(async (req: Request, res: Response) => {
  const superAdminId = req.params.superAdminId;
  const result = await superAdminService.updateSuperAdmin(
    superAdminId as string,
    req.body,
  );
  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Update super admin successfully",
    data: result,
  });
});

const softDeleteSuperAdmin = catchAsync(async (req: Request, res: Response) => {
  const superAdminId = req.params.superAdminId;
  const result = await superAdminService.softDeleteSuperAdmin(
    superAdminId as string,
    req.user
  );
  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Super admin deleted successfully",
    data: result,
  });
});

export const superAdminController = {
  getAllSuperAdmin,
  getSuperAdminById,
  updateSuperAdmin,
  softDeleteSuperAdmin,
};
