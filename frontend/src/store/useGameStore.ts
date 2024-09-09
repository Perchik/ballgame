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
  resetGame: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  uuid: null,
  tubes: [],
  numTubes: 0,
  tubeHeight: 0,
  numColors: 0,
  selectedTubeIndex: null,
  setGame: (game) => set((state) => ({ ...state, ...game })),
  selectTube: (index) => set(() => ({ selectedTubeIndex: index })),
  resetGame: () =>
    set(() => ({
      uuid: null,
      tubes: [],
      numTubes: 0,
      tubeHeight: 0,
      numColors: 0,
    })),
}));
