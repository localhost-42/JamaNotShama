import { Router } from "express";
import {
     updateTopScoreHandler,
     getTopScoresHandler,
     getTopScoreByIdHandler
      } from '../controllers/score.controller.js'


const router = Router();


router.get("/", getTopScoresHandler);
router.get('/:id', getTopScoreByIdHandler);
router.put("/:id", updateTopScoreHandler);


export default router;
