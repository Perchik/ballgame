import {create} from "zustand";

interface GameState {
  uuid: string | null;
  tubes: string[];
  numTubes: number;
  tubeHeight: number;
  numColors: number;
  setGame: (game: Partial<GameState>) => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  uuid: null,
  tubes: [],
  numTubes: 0,
  tubeHeight: 0,
  numColors: 0,
  setGame: (game) => set((state) => ({ ...state, ...game })),
  resetGame: () =>
    set(() => ({
      uuid: null,
      tubes: [],
      numTubes: 0,
      tubeHeight: 0,
      numColors: 0,
    })),
}));
