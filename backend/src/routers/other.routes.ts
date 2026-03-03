import { Router } from "express";
import { login, logs, excelHandler } from "../controllers/other.controller.js";

const router = Router();

router.post("/login", login);
router.get("/logs", logs);
router.get('/excel', excelHandler)


export default router;
