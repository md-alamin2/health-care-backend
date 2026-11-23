import status from "http-status";
import AppError from "../../errorHelpers/AppError";
import { prisma } from "../../lib/prisma";
import { IUpdateDoctorPayload } from "./doctor.interface";

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
          specialty: true,
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

const updateDoctor = async (id: string, payload: IUpdateDoctorPayload) => {
  // check if doctor exist
  const isDoctorExists = await prisma.doctor.findUnique({
    where: {
      id,
    },
  });

  if (!isDoctorExists) {
    throw new AppError(status.NOT_FOUND, "Doctor not found");
  }

  const { specialties, ...doctorData } = payload;

  const updatedDoctor = await prisma.doctor.update({
    where: {
      id,
    },
    data: doctorData,
    include: {
      specialties: {
        include: {
          specialty: true,
        },
      },
    },
  });

  // If specialties are provided, update them separately
  if (specialties && specialties.length > 0) {
    // Delete old Specialties
    await prisma.doctorSpecialty.deleteMany({
      where: { doctorId: id },
    });

    // Add new Specialties
    const specialtiesData = specialties.map((specialtyId) => ({
      doctorId: id,
      specialtyId,
    }));

    await prisma.doctorSpecialty.createMany({
      data: specialtiesData,
    });
  }

  const result = await prisma.doctor.findUnique({
    where: {
      id,
    },
    include: {
      specialties: {
        include: {
          specialty: true,
        },
      },
    },
  });

  return {
    ...result,
    specialties: result?.specialties.map((s) => s.specialty),
  };
};



export const doctorService = {
  getAllDoctor,
  getDoctorById,
  updateDoctor
};
