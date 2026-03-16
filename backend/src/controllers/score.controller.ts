import {
  updateTopScore,
  getTopScores,
  getTopScoreById,
} from "../services/score.service.js";
import type { ScoreRow } from "../util/types.js";
import type { Request, Response } from "express";

export const updateTopScoreHandler = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.id);
    const score = Number(req.query.score);

    if (!Number.isInteger(userId)) {
      return res.status(400).json({ message: "Invalid id param" });
    }

    if (!Number.isInteger(score)) {
      return res.status(400).json({ message: "Invalid score query param" });
    }


await updateTopScore(userId, score);

    return res.status(200).send('action preformed succusffuly');
  } catch (error) {
    return res.status(500).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const getTopScoresHandler = async (_req: Request, res: Response) => {
  try {
    const topScores: ScoreRow[] = await getTopScores();
    return res.status(200).json(topScores);
  } catch (error) {
    return res.status(500).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const getTopScoreByIdHandler = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.id);

  
    const topScore = await getTopScoreById(userId);

    if (!topScore) {
      return res.status(404).json({ message: "Score not found" });
    }

    return res.status(200).json(topScore);
  } catch (error) {
    return res.status(500).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};