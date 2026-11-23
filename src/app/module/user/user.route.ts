import { Router } from "express";
import { userController } from "./user.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../../../generated/prisma/enums";
import { UserValidation } from "./user.validation";

const router = Router();

router.post(
  "/create-doctor",
  validateRequest(UserValidation.createDoctorValidationSchema),
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  userController.cerateDoctor,
);

router.post(
  "/create-admin",
  checkAuth(Role.SUPER_ADMIN),
  validateRequest(UserValidation.createAdminValidationSchema),
  userController.createAdmin
);

export const userRoute = router;
