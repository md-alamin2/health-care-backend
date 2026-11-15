import { Router } from "express";
import { specialtyRoute } from "../module/specialty/specialty.route";
import { authRoutes } from "../module/auth/auth.route";

const router = Router();

// Mount the specialtyRoute at the "/specialties" path
router.use("/specialties", specialtyRoute);

router.use("/auth", authRoutes);

export const indexRoute = router;