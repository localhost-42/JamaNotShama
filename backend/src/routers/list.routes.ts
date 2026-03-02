import { Router } from "express";
import {
  enterQueue,
  exitQueue,
  enterList,
  exitList,
} from "../controllers/list.controller";

const router = Router();

router.get("/enter/:id/queue", enterQueue);
router.get("/enter/:id/list", enterList);
router.post("/exit/:id/queue", exitQueue);
router.delete("/exit/:id/list", exitList);

export default router;
