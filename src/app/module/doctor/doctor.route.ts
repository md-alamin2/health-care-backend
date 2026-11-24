import { Router } from "express";
import { doctorController } from "./doctor.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../../../generated/prisma/enums";
import { validateRequest } from "../../middleware/validateRequest";
import { doctorValidation } from "./doctor.validation";

const router = Router();

router.get("/", doctorController.getAllDoctor);
router.get(
  "/:doctorId",
  checkAuth(Role.ADMIN, Role.DOCTOR, Role.SUPER_ADMIN, Role.PATIENT),
  doctorController.getDoctorById,
);

router.patch(
  "/:doctorId",
  checkAuth(Role.ADMIN, Role.DOCTOR, Role.SUPER_ADMIN),
  validateRequest(doctorValidation.doctorUpdateZodSchema),
  doctorController.updateDoctor,
);

router.delete(
  "/:doctorId",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  doctorController.softDeleteDoctor,
);

export const doctorRoutes = router;
