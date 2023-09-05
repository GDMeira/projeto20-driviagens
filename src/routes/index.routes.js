import { Router } from "express";
import authRouter from "./auth.routes.js";
import servicesRouter from "./services.routes.js";
import userRouter from "./user.routes.js";


const router = Router();

router.use(authRouter);

export default router