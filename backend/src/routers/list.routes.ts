import { Router } from "express";
import {
  enterQueueHandler,
  exitQueueHandler,
  enterListHandler,
  exitListHandler,
  getListHandler,
  getQueueHandler,
} from "../controllers/list.controller.js";

const router = Router();

router.post("/enter/:id/queue", enterQueueHandler);
router.post("/enter/:id/list", enterListHandler);
router.delete("/exit/:id/queue", exitQueueHandler);
router.put("/exit/:id/list", exitListHandler);
router.get("/queue", getQueueHandler);
router.get("/list", getListHandler);

export default router;
