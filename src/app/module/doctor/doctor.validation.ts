import z from "zod";
import { Gender } from "../../../generated/prisma/enums";

const doctorUpdateZodSchema = z
  .object({
    name: z.string(),
    profilePhoto: z.url("Invalid URL format"),
    contactNumber: z.string(),
    registrationNumber: z.string(),
    experience: z
      .int("Experience must be a Whole number")
      .nonnegative("Experience cannot be negative"),
    gender: z.enum([Gender.FEMALE, Gender.MALE]),
    appointmentFee: z.number().nonnegative("Appointment fee must be positive"),
    qualification: z.string(),
    currentWorkingPlace: z.string(),
    designation: z.string(),
    specialties: z.array(z.uuid("Each specialty ID must be a valid UUID")),
  })
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required for update",
  });


export const doctorValidation = {
    doctorUpdateZodSchema
}