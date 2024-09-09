import { Char } from "../utils/char"; 

export type Ball = Char;

export type Tube = string;
 
export interface GameState {
  uuid: string; // Unique identifier for the game
  tubes: Tube[]; // List of tubes, each containing an array of Balls
  numTubes: number; // Total number of tubes
  tubeHeight: number; // Maximum number of balls in a tube
  numColors: number; // Number of distinct colors used in the game
}
