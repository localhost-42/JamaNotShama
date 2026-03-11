import { Router } from "express";
import {
     updateTopScoreHandler,
     getTopScoresHandler
      } from '../controllers/score.controller.js'


const router = Router();


router.get("/", getTopScoresHandler);
router.put("/:id", updateTopScoreHandler);


export default router;
