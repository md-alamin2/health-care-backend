import { Router } from "express";
import { superAdminController } from "./superAdmin.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { superAdminValidation } from "./superAdmin.validation";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.get("/", superAdminController.getAllSuperAdmin);

router.get("/:superAdminId", superAdminController.getSuperAdminById);

router.patch(
  "/:superAdminId",
  checkAuth(Role.SUPER_ADMIN),
  validateRequest(superAdminValidation.updateSuperAdminValidationSchema),
  superAdminController.updateSuperAdmin,
);

router.delete(
  "/:superAdminId",
  checkAuth(Role.SUPER_ADMIN),
  superAdminController.softDeleteSuperAdmin,
);

export const superAdminRoutes = router;
