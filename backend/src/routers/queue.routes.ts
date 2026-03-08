import { Router } from "express";
import {
  enterQueueHandler,
  exitQueueHandler,
  getQueueHandler,
} from "../controllers/queue.controller.js";

const router = Router();

router.post("/enter/:id", enterQueueHandler);
router.delete("/exit/:id", exitQueueHandler);
router.get("/", getQueueHandler);


export default router;
