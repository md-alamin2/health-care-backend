import status from "http-status";
import AppError from "../../errorHelpers/AppError";
import { prisma } from "../../lib/prisma";
import { IUpdateSuperAdmin } from "./superAdmin.interface";
import { IRequestUser } from "../../interfaces/request.interface";

const getAllSuperAdmin = async () => {
  const result = await prisma.superAdmin.findMany({
    where: {
      isDeleted: false,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      name: true,
      email: true,
      profilePhoto: true,
      contactNumber: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return result;
};

const getSuperAdminById = async (id: string) => {
  const result = await prisma.superAdmin.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      profilePhoto: true,
      contactNumber: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!result) {
    throw new AppError(status.NOT_FOUND, "Super Admin not found");
  }
  return result;
};

const updateSuperAdmin = async (id: string, payload: IUpdateSuperAdmin) => {
  // check if super admin exist
  const isSuperAdminExists = await prisma.superAdmin.findUnique({
    where: {
      id,
    },
  });

  if (!isSuperAdminExists) {
    throw new AppError(status.NOT_FOUND, "Super admin not found");
  }

  const updatedSuperAdmin = await prisma.superAdmin.update({
    where: {
      id,
    },
    data: payload,
  });

  return updatedSuperAdmin;
};

const softDeleteSuperAdmin = async (id: string, user: IRequestUser) => {
  // check if super admin exist or deleted already
  const superAdminExists = await prisma.superAdmin.findUnique({
    where: { id },
  });

  if (!superAdminExists) {
    throw new AppError(status.NOT_FOUND, "Super admin not found");
  }

  if (superAdminExists.isDeleted) {
    throw new AppError(status.NOT_FOUND, "Super admin is already deleted");
  }

  if (superAdminExists.email === user.email) {
    throw new AppError(
      status.CONFLICT,
      "Super Admin can not delete his own profile",
    );
  }

  // mark super admin as deleted
  const result = await prisma.superAdmin.update({
    where: { id },
    data: {
      isDeleted: true,
      deletedAt: new Date(),
    },
  });

  return result;
};

export const superAdminService = {
  getAllSuperAdmin,
  getSuperAdminById,
  updateSuperAdmin,
  softDeleteSuperAdmin,
};
