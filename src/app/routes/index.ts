import { Router } from "express";
import { specialtyRoute } from "../module/specialty/specialty.route";

const router = Router();

// Mount the specialtyRoute at the "/specialties" path
router.use("/specialties", specialtyRoute);

export const indexRoute = router;