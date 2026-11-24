import { Router } from "express";
import { adminController } from "./admin.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { adminValidation } from "./admin.validation";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.get("/", adminController.getAllAdmin);

router.get("/:adminId", adminController.getAdminById);

router.patch(
  "/:adminId",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(adminValidation.updateAdminValidationSchema),
  adminController.updateAdmin,
);

router.delete(
  "/:adminId",
  checkAuth(Role.SUPER_ADMIN),
  adminController.softDeleteAdmin,
);

export const adminRoutes = router;
