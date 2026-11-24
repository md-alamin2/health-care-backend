import { Router } from "express";
import { specialtyRoute } from "../module/specialty/specialty.route";
import { authRoutes } from "../module/auth/auth.route";
import { userRoute } from "../module/user/user.route";
import { doctorRoutes } from "../module/doctor/doctor.route";
import { adminRoutes } from "../module/admin/admin.route";
import { superAdminRoutes } from "../module/superAdmin/superAdmin.route";

const router = Router();

// Mount the specialtyRoute at the "/specialties" path
router.use("/specialties", specialtyRoute);

router.use("/auth", authRoutes);

router.use("/users", userRoute);

router.use("/doctors", doctorRoutes)

router.use("/admins", adminRoutes)

router.use("/super-admins", superAdminRoutes)

export const indexRoute = router;