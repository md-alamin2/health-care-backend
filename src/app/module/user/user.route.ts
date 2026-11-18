import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();

router.post("/create-doctor", userController.cerateDoctor)

export const userRoute = router