import status from "http-status";
import { UserStatus } from "../../../generated/prisma/enums";
import AppError from "../../errorHelpers/AppError";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
// import { prisma } from "../../lib/prisma";

interface IRegisterPatientPayload {
  name: string;
  email: string;
  password: string;
}
const registerPatient = async (payload: IRegisterPatientPayload) => {
  const { name, email, password } = payload;

  const data = await auth.api.signUpEmail({
    body: {
      name,
      email,
      password,
    },
  });

  if (!data.user) {
    // throw new Error("User registration failed");
    throw new AppError(status.NOT_FOUND, "User registration failed")
  }

  // TODO: Implement the logic to create a patient record in the database using Prisma
  try {
    const patient = await prisma.$transaction(async (tx) => {
      const result = await tx.patient.create({
        data: {
          userId: data.user.id,
          name,
          email,
        },
      });

      return result;
    });

    return {
      ...data,
      patient,
    };
  } catch (error) {
    console.log(error);
    await prisma.user.delete({
      where: {
        id: data.user.id,
      },
    });
    throw error;
  }
};

interface ILoginUserPayload {
  email: string;
  password: string;
}

const loginUser = async (payload: ILoginUserPayload, headers: Headers) => {
  const { email, password } = payload;

  const response = await auth.api.signInEmail({
    body: {
      email,
      password,
    },
    headers,
    asResponse: true,
  });

  const data = await response.json();

  if (!response.ok) {
    // throw new Error(data.message || "Login failed");
    throw new AppError(status.UNAUTHORIZED,data.message || "Login failed");
  }

  if (data.user.status === UserStatus.BLOCKED) {
    // throw new Error("User is blocked");
    throw new AppError(status.FORBIDDEN,"User is blocked");
  }

  if (data.user.status === UserStatus.Deleted) {
    // throw new Error("User is deleted");
    throw new AppError(status.NOT_FOUND,"User is deleted");
  }

  return {
    data,
    headers: response.headers,
  };
};

export const authService = {
  registerPatient,
  loginUser,
};
