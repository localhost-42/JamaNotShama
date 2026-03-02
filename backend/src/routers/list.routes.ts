import { Router } from "express";
import {
  enterQueue,
  exitQueue,
  enterList,
  exitList,
} from "../controllers/list.controller";

const router = Router();

router.post("/enter/:id/queue", enterQueue);
router.post("/enter/:id/list", enterList);
router.delete("/exit/:id/queue", exitQueue);
router.put("/exit/:id/list", exitList);

export default router;
