import z from "zod";

const updateSuperAdminValidationSchema = z
  .object({
    name: z.string(),
    profilePhoto: z.url("Invalid URL format"),
    contactNumber: z.string(),
    address: z.string(),
  })
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required for update",
  });

export const superAdminValidation = {
  updateSuperAdminValidationSchema,
};
