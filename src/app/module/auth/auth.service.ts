import { UserStatus } from "../../../generated/prisma/enums";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
// import { prisma } from "../../lib/prisma";

interface IRegisterPatientPayload {
    name: string,
    email: string,
    password: string,
}
const registerPatient = async (payload: IRegisterPatientPayload)=>{
    const { name, email, password } = payload;

    const data = await auth.api.signUpEmail({
        body:{
            name,
            email,
            password
        }
    })

    if(!data.user){
        throw new Error("User registration failed");
    }

    // TODO: Implement the logic to create a patient record in the database using Prisma
    const patient = await prisma.$transaction(async (tx)=>{
       const result = await tx.patient.create({
            data:{
                userId: data.user.id,
                name,
                email,
            }
        })

        return result;
    })

    return {
        ...data,
        patient
    }
}

interface ILoginUserPayload {
    email: string,
    password: string,
}

const loginUser = async (
  payload: ILoginUserPayload,
  headers: Headers
) => {
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
    throw new Error(data.message || "Login failed");
  }

  if (data.user.status === UserStatus.BLOCKED) {
    throw new Error("User is blocked");
  }

  if (data.user.status === UserStatus.Deleted) {
    throw new Error("User is deleted");
  }

  return {
    data,
    headers: response.headers,
  };
};

export const authService ={
    registerPatient,
    loginUser
}