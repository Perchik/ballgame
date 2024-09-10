import { create } from "zustand";

interface GameState {
  uuid: string | null;
  tubes: string[];
  numTubes: number;
  tubeHeight: number;
  numColors: number;
  selectedTubeIndex: number | null;
  setGame: (game: Partial<GameState>) => void;
  selectTube: (index: number | null) => void;
  moveBall: (targetIndex: number) => void;
  isGameOver: () => boolean;
  resetGame: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  uuid: null,
  tubes: [],
  numTubes: 0,
  tubeHeight: 0,
  numColors: 0,
  selectedTubeIndex: null,
  setGame: (game) => set((state) => ({ ...state, ...game })),
  selectTube: (index) => set(() => ({ selectedTubeIndex: index })),

  moveBall: (targetIndex) => {
    const { selectedTubeIndex, tubes, tubeHeight } = get();

    if (selectedTubeIndex === null) return;
    const sourceTube = tubes[selectedTubeIndex];
    const targetTube = tubes[targetIndex];

    if (sourceTube === undefined || targetTube === undefined) return;

    const ballToMove = sourceTube.slice(-1);
    if (!ballToMove) return; // No ball to move

    // Find contiguous balls of the same color from the top
    let moveCount = 1;
    for (let i = sourceTube.length - 2; i >= 0; i--) {
      if (sourceTube[i] === ballToMove) {
        moveCount++;
      } else {
        break;
      }
    }

    // Check if the target tube can accept all the balls
    const targetTopBall = targetTube.slice(-1);
    const targetTubeIsEmpty = targetTube === "";
    const targetTubeHasSpace = targetTube.length + moveCount <= tubeHeight;

    if (
      targetTubeHasSpace &&
      (targetTubeIsEmpty || targetTopBall === ballToMove)
    ) {
      // Move the contiguous balls: remove from source and add to target
      const updatedSourceTube = sourceTube.slice(0, -moveCount);
      const updatedTargetTube = targetTube + sourceTube.slice(-moveCount);

      // Update tubes
      const updatedTubes = [...tubes];
      updatedTubes[selectedTubeIndex] = updatedSourceTube;
      updatedTubes[targetIndex] = updatedTargetTube;

      // Update the state
      set({
        tubes: updatedTubes,
        selectedTubeIndex: null, // Deselect after move
      });
    } else {
      console.error("Invalid move: can't move balls");
      // Deselect even if the move is invalid
      set({
        selectedTubeIndex: null,
      });
    }
  },

  isGameOver: () => {
    const { tubes } = get();

    return tubes.every((tube) => {
      if (tube.length === 0) return true; // Empty tube
      return tube.split("").every((ball) => ball === tube[0]); // Only one color
    });
  },

  resetGame: () =>
    set(() => ({
      uuid: null,
      tubes: [],
      numTubes: 0,
      tubeHeight: 0,
      numColors: 0,
      selectedTubeIndex: null,
    })),
}));
