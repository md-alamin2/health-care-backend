import status from "http-status";
import AppError from "../../errorHelpers/AppError";
import { prisma } from "../../lib/prisma";
import { IUpdateAdmin } from "./admin.interface";

const getAllAdmin = async () => {
  const result = await prisma.admin.findMany({
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

const getAdminById = async (id: string) => {
  const result = await prisma.admin.findUnique({
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
    throw new AppError(status.NOT_FOUND, "Admin not found");
  }
  return result;
};

const updateAdmin = async (id: string, payload: IUpdateAdmin) => {
  // check if admin exist
  const isAdminExists = await prisma.admin.findUnique({
    where: {
      id,
    },
  });

  if (!isAdminExists) {
    throw new AppError(status.NOT_FOUND, "Admin not found");
  }

  const updatedAdmin = await prisma.admin.update({
    where: {
      id,
    },
    data: payload,
  });

  return updatedAdmin;
};

const softDeleteAdmin = async(id: string)=>{
    // check if admin exist or deleted already
    const adminExists = await prisma.admin.findUnique({
        where: {id}
    })

    if(!adminExists){
        throw new AppError(status.NOT_FOUND, "Admin not found")
    }

    if(adminExists.isDeleted){
        throw new AppError(status.NOT_FOUND, "Admin is already deleted")
    }

    // mark admin as deleted
    const result = await prisma.admin.update({
        where:{id},
        data:{
            isDeleted: true,
            deletedAt: new Date()
        }
    })

    return result
}

export const adminService = {
  getAllAdmin,
  getAdminById,
  updateAdmin,
  softDeleteAdmin
};
