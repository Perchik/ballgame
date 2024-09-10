import { Router } from "express";
import { GameState } from "@shared/models/game"; // Assuming you have a shared GameState model
import { connectToDatabase } from "../utils/mongodb"; // MongoDB connection utility
import { v4 as uuidv4 } from "uuid"; // UUID generation library

const router = Router();

// POST /api/generate - Generate a new game state
router.post("/generate", async (req, res) => {
  const { numTubes, numColors, tubeHeight } = req.body;

  const gameState: GameState = {
    uuid: uuidv4(),
    tubes: ["abb", "aab", ""], // TODO actually generate game
    numTubes: 3,
    tubeHeight: 3,
    numColors: 2,
  };

  try {
    const db = await connectToDatabase();
    await db.collection("games").insertOne(gameState);
    res.status(200).json(gameState);
  } catch (error) {
    console.error("Error generating game:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/share - Share the current game state with a UUID
router.post("/share", async (req, res) => {
  const { tubes, numTubes, tubeHeight, numColors } = req.body;

  const gameState: GameState = {
    uuid: uuidv4(),
    tubes,
    numTubes,
    tubeHeight,
    numColors,
  };

  try {
    const db = await connectToDatabase();
    await db.collection("games").insertOne(gameState);
    res.status(200).json({
      uuid: gameState.uuid,
      shareableUrl: `/game/${gameState.uuid}`,
    });
  } catch (error) {
    console.error("Error sharing game:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /api/game/:uuid - Fetch a game state by UUID
router.get("/game/:uuid", async (req, res) => {
  const { uuid } = req.params;

  try {
    const db = await connectToDatabase();
    const gameState = await db.collection("games").findOne({ uuid });

    if (!gameState) {
      return res.status(404).json({ error: "Game not found" });
    }

    res.status(200).json(gameState);
  } catch (error) {
    console.error("Error fetching game:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
