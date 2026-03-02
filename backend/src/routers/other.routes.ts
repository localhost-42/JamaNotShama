import { Router } from "express";
import { login, logs } from "../controllers/other.controller";

const router = Router();

router.get("/login", login);
router.post("/logs", logs);

export default router;
