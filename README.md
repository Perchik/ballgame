# Ball Sorting Game (TypeScript + React + Vercel + MongoDB)

This is a ball-sorting puzzle game built using a full TypeScript stack, including React for the frontend, serverless functions hosted on Vercel for the backend, and MongoDB Atlas for persistent storage of game states. The goal of the game is to sort colored balls into tubes, where each tube must contain balls of only one color.

Players can play the game or request the system to solve the puzzle using the built-in solver. Games can be generated, played, shared, and solved.

## System Overview

### Key Features:
- **Frontend**: Built with React + Vite, using Zustand for state management and basic CSS for styling.
- **Backend**: Hosted on Vercel as serverless functions, written in TypeScript.
- **Database**: MongoDB Atlas is used to store game states and UUIDs for game sharing.
- **Game Logic**: The backend generates solvable games, provides game state sharing, and solves puzzles when requested.

### Data Models:
The game state and tubes are represented as strings of hex characters to denote colored balls, where each ball is a single hex character (`0-9`, `A-F`). The backend validates JSON objects for correctness and integrity before storing or processing them.

## Data Models

### Ball
A `Ball` is represented by a single hex character (`0-9`, `A-F`).

```typescript
type Ball = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
```

### Tube
A `Tube` is a string of hex characters representing the balls in the tube, where each character is a `Ball`.

```typescript
type Tube = string;
```

### GameState
The game state is the main object representing the entire game, including the list of tubes, the number of tubes, tube height, and other metadata.

```typescript
interface GameState {
  uuid: string;        // Unique identifier for the game
  tubes: Tube[];       // List of tubes, each represented as a string of hex characters
  numTubes: number;    // Total number of tubes in the game
  tubeHeight: number;  // Maximum number of balls in a tube
  numColors: number;   // Number of distinct colors used in the game
}
```

### Example of a GameState:
```json
{
  "uuid": "asdhj1341zsjdj123asdjlk545",
  "tubes": ["A3F", "F3A", "33F", ""],
  "numTubes": 4,
  "tubeHeight": 3,
  "numColors": 3,
}
```

## Validation

The backend validates JSON objects using runtime validation to ensure game states are correct before storing or processing them. This validation includes checking that:
- Each `Tube` contains only valid hex characters (`0-9`, `A-F`).
- The number of tubes and balls in each tube matches the game configuration.
- The game is solvable before being stored.

### Example Validation (Tube):
```typescript
function isValidTube(tube: string): boolean {
  return /^[0-9A-F]*$/.test(tube); 
}
```

## API Endpoints

### `/generate` (POST)
Generates a new solvable game and stores it in MongoDB.

**Request**:
```json
{
  "numTubes": 6,
  "numColors": 4,
  "tubeHeight": 4
}
```

**Response**:
```json
{
  "uuid": "some-unique-uuid",
  "tubes": ["A3F", "F3A", "33F", ""],
  "numTubes": 4,
  "tubeHeight": 3,
  "numColors": 3,
}
```

### `/solve` (POST)
Takes a game state and returns the steps required to solve it.

**Request**:
```json
{
  "uuid": "some-unique-uuid",
  "tubes": ["A3F", "F3A", "33F", ""]
}
```

**Response**:
```json
{
  "steps": [
    { "fromTube": 1, "toTube": 3 },
    { "fromTube": 2, "toTube": 1 }
  ],
  "solved": true
}
```

### `/game/{uuid}` (GET)
Fetches a game state by UUID.

**Response**:
```json
{
  "uuid": "some-unique-uuid",
  "tubes": ["A3F", "F3A", "33F", ""],
  "numTubes": 4,
  "tubeHeight": 3,
  "numColors": 3,
}
```

### `/share` (POST)
Stores the current game state and returns a shareable URL.

**Request**:
```json
{
  "tubes": ["A3F", "F3A", "33F", ""]
}
```

**Response**:
```json
{
  "uuid": "some-unique-uuid",
  "url": "/game/some-unique-uuid"
}
```

## How to Run Locally

### Prerequisites

- **Node.js**: Install the latest LTS version of Node.js.
- **MongoDB Atlas**: Set up a MongoDB Atlas account and create a database.
- **Vercel**: Install the Vercel CLI for local development of serverless functions.

### Clone the Repository

```bash
git clone https://github.com/perchik/ballgame.git
cd ballgame
```

### Install Dependencies

```bash
npm install
```

### Set Up Environment Variables

Create a `.env` file in the root of your project and add the following:

```
MONGO_URI= [TODO]
```

### Run the Backend Locally

```bash
vercel dev
```

This will run the backend serverless functions locally using Vercel's CLI.

### Run the Frontend Locally

```bash
npm run dev
```

This will run the React frontend using Vite.

### Run Unit Tests

To run the Jest unit tests for the backend:

```bash
npm test
```

## Deployment

To deploy to Vercel:

1. Commit your code to GitHub (or another Git provider).
2. Link the repository to your Vercel account.
3. Push changes to your `main` branch and Vercel will automatically deploy the app.

## Future Enhancements

- Add analytics for tracking the number of games played and page views.
- Implement caching for frequently requested game states.
- Add error monitoring and performance optimizations.
