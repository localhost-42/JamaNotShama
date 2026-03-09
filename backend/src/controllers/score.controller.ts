import { updateTopScore,
           getTopScores
                  } from '../services/score.service.js'
import type { ScoreRow } from '../util/types.js';
import { type Request, type Response } from "express";




export const updateTopScoreHandler = async (req: Request, res: Response) => {
  try{
   const updatedScore: number = await updateTopScore(Number(req.body.score), Number(req.params.id));

    res.status(200).json(updatedScore);
  } catch (err) {
    res.status(404).send(err);  
  }
};

export const  getTopScoresHandler = async (req: Request, res: Response) => {
  try{
    const topScores: ScoreRow[] = await getTopScores();

    res.status(200).json(topScores);
  } catch (err) {
    res.status(400).send(err);  
  }
};