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

    if (selectedTubeIndex === null) return; // No tube selected -- shouldnt' get here

    const sourceTube = tubes[selectedTubeIndex];
    const targetTube = tubes[targetIndex];

    if (sourceTube === undefined || targetTube === undefined) return;

    // Get the top ball of the source tube (the last non-empty ball)
    const ballToMove = sourceTube.slice(-1);
    if (!ballToMove) return; // No ball to move

    // Check if the target tube can accept the ball
    const targetTopBall = targetTube.slice(-1);
    const targetTubeIsEmpty = targetTube === "";
    const targetTubeHasSpace = targetTube.length < tubeHeight;

    if (
      targetTubeHasSpace &&
      (targetTubeIsEmpty || targetTopBall === ballToMove)
    ) {
      // Move the ball: remove from source and add to target
      const updatedSourceTube = sourceTube.slice(0, -1); // Remove the last ball
      const updatedTargetTube = targetTube + ballToMove; // Add the ball to the target

      // Update tubes
      const updatedTubes = [...tubes];
      updatedTubes[selectedTubeIndex] = updatedSourceTube;
      updatedTubes[targetIndex] = updatedTargetTube;

      // Update the state
      set({
        tubes: updatedTubes,
        selectedTubeIndex: null, // Deselect after move
      });
    }
  },
  resetGame: () =>
    set(() => ({
      uuid: null,
      tubes: [],
      numTubes: 0,
      tubeHeight: 0,
      numColors: 0,
    })),
}));
