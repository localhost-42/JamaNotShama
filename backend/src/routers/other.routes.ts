import { Router } from "express";
import { login, logs, getList, getQueue } from "../controllers/other.controller.js";

const router = Router();

router.post("/login", login);
router.get("/logs", logs);
router.get("/list", getList);
router.get("/queue", getQueue);

export default router;
