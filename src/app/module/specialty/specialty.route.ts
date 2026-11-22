import { Router } from "express";
import { specialtyController } from "./specialty.controller";
import { verifyRole } from "../../middleware/verifyRoles";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post(
  "/",
  verifyRole(Role.ADMIN, Role.SUPER_ADMIN),
  specialtyController.createSpecialty,
);
router.get("/", specialtyController.getAllSpecialties);
router.patch(
  "/:id",
  verifyRole(Role.ADMIN, Role.SUPER_ADMIN),
  specialtyController.updateSpecialty,
);
router.delete(
  "/:id",
  verifyRole(Role.ADMIN, Role.SUPER_ADMIN),
  specialtyController.deleteSpecialty,
);

export const specialtyRoute = router;
