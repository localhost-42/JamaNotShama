import { Router } from "express";
import {
  enterListHandler,
  exitListHandler,
  getListHandler,
    logs,
} from "../controllers/list.controller.js";

const router = Router();

router.post("/enter/:id", enterListHandler);
router.put("/exit/:id", exitListHandler);

router.get("/", getListHandler);
router.get("/logs", logs);


export default router;
