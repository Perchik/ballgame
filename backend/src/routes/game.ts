import { Router } from "express";
import { GameState } from "@shared/models/game";

const router = Router();

// POST /api/generate
router.post("/generate", (req, res) => {
  const { numTubes, numColors, tubeHeight } = req.body;

  const gameState: GameState = {
    uuid: "unique-game-uuid",
    tubes: Array(numTubes).fill(""), // TODO: add actual creation logic.
    numTubes,
    tubeHeight,
    numColors,
  };

  res.status(200).json(gameState);
});

// POST /api/solve
router.post("/solve", (req, res) => {
  const { uuid, tubes } = req.body;
  // TODO
  const solution = {
    steps: [
      { fromTube: 1, toTube: 4 },
      { fromTube: 2, toTube: 1 },
    ],
    solved: true,
  };

  res.status(200).json(solution);
});

// GET /api/game/:uuid
router.get("/game/:uuid", (req, res) => {
  const { uuid } = req.params;
  //TODO
  const gameState: GameState = {
    uuid,
    tubes: ["abc", "bca", "cab", ""],
    numTubes: 6,
    tubeHeight: 4,
    numColors: 4,
  };

  res.status(200).json(gameState);
});

export default router;
