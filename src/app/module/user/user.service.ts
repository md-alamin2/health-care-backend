import { Role, Specialty } from "../../../generated/prisma/browser";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
import { ICreateDoctorPayload } from "./user.interface";

const createDoctor = async (payload: ICreateDoctorPayload) => {
  const specialties: Specialty[] = [];

  for (const specialtyId of payload.specialty) {
    const specialty = await prisma.specialty.findUnique({
      where: {
        id: specialtyId,
      },
    });

    if (!specialty) {
      throw new Error(`Specialty with id ${specialtyId} not found`);
    }
    specialties.push(specialty);
  }

  //   check if user exists
  const userExists = await prisma.user.findUnique({
    where: {
      email: payload.doctor.email,
    },
  });

  if (userExists) {
    throw new Error("User with this email already exists");
  }

//   create user
const userData = await auth.api.signUpEmail({
    body:{
        email: payload.doctor.email,
        password: payload.password,
        role: Role.DOCTOR,
        name: payload.doctor.name,
        needPasswordChange: true
    }
})

try {
    const result = await prisma.$transaction(async(tx)=>{
        const doctor = await tx.doctor.create({
            data:{
                userId: userData.user.id,
                name: payload.doctor.name,
                email: payload.doctor.email,
                profilePhoto: payload.doctor.profilePhoto,
                contactNumber: payload.doctor.contactNumber,
                address: payload.doctor.address,
                registrationNumber: payload.doctor.registrationNumber,
                experience: payload.doctor.experience,
                gender: payload.doctor.gender,
                appointmentFee: payload.doctor.appointmentFee,
                qualification: payload.doctor.qualification,
                currentWorkingPlace: payload.doctor.currentlyWorkingPlace,
                designation: payload.doctor.designation
            }
        })

        
    })
    
} catch (error) {
    console.log("transaction error :", error)
    await prisma.user.delete({
        where:{
            id: userData.user.id
        }
    })
    throw error
}
};
