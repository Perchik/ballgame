// frontend/src/App.tsx
import React, { useState } from "react";
import { Box, Button, Heading, Spinner, VStack, Text } from "@chakra-ui/react";
import { useGameStore } from "./store/useGameStore";
const App: React.FC = () => {
  const { uuid, tubes, numTubes, tubeHeight, numColors, setGame, resetGame } =
    useGameStore();
  const [isLoading, setIsLoading] = useState(false);

  const generateNewGame = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          numTubes: 4,
          numColors: 3,
          tubeHeight: 4,
        }),
      });
      const data = await response.json();
      setGame(data);
    } catch (error) {
      console.error("Error generating game:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <VStack spacing={6} align="center" mt={8}>
      <Heading>Ball Sorting Game</Heading>

      <Button
        onClick={generateNewGame}
        isLoading={isLoading}
        colorScheme="blue"
      >
        {isLoading ? "Generating..." : "Generate New Game"}
      </Button>

      {/* Display game info if a game is generated */}
      {uuid && (
        <Box
          mt={6}
          p={4}
          borderWidth="1px"
          borderRadius="lg"
          width="300px"
          textAlign="left"
        >
          <Text fontWeight="bold">Game UUID: {uuid}</Text>
          <Text>Number of Tubes: {numTubes}</Text>
          <Text>Tube Height: {tubeHeight}</Text>
          <Text>Number of Colors: {numColors}</Text>
          <Text mt={2} fontWeight="bold">
            Tubes:
          </Text>
          {tubes.map((tube, index) => (
            <Text key={index}>
              Tube {index + 1}: {tube || "[Empty]"}
            </Text>
          ))}
        </Box>
      )}

      {/* Loading Spinner */}
      {isLoading && <Spinner size="xl" />}
    </VStack>
  );
};

export default App;
