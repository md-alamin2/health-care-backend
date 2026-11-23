import status from "http-status";
import AppError from "../../errorHelpers/AppError";
import { prisma } from "../../lib/prisma";

const getAllDoctor = async () => {
  const result = await prisma.doctor.findMany({
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
      registrationNumber: true,
      experience: true,
      gender: true,
      appointmentFee: true,
      qualification: true,
      currentWorkingPlace: true,
      designation: true,
      averageRating: true,
      createdAt: true,
      updatedAt: true,
      specialties: {
        select: {
          specialty: {
            select: {
              id: true,
              title: true,
            },
          },
        },
      },
    },
  });

  const doctors = result.map((doctor) => ({
    ...doctor,
    specialties: doctor.specialties.map((s) => s.specialty),
  }));

  return doctors;
};

const getDoctorById = async (id: string) => {
  const result = await prisma.doctor.findUnique({
    where: {
      id,
      isDeleted: false,
    },
    include: {
      specialties: {
        include: {
          specialty: true
        },
      },
    },
  });

  if (!result) {
    throw new AppError(status.NOT_FOUND, "Doctor not found");
  }

  const doctor = {
    ...result,
    specialties: result.specialties.map((s) => s.specialty),
  };

  return doctor;
};

export const doctorService = {
  getAllDoctor,
  getDoctorById,
};
