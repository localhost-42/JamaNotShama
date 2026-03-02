import { Router } from "express";
import { login, logs } from "../controllers/other.controller";

const router = Router();

router.post("/login", login);
router.get("/logs", logs);

export default router;
