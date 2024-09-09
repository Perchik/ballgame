import React, { useState } from "react";
import { Box, Button, Heading, HStack, VStack, Text } from "@chakra-ui/react";
import { useGameStore } from "./store/useGameStore";
import Tube from "./components/Tube";

const App: React.FC = () => {
  const { uuid, tubes, numTubes, tubeHeight, numColors, setGame, selectTube } =
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
      });
      const data = await response.json();
      setGame(data);
    } catch (error) {
      console.error("Error generating game:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle deselection by clicking anywhere on the page
  const handleDeselect = () => {
    selectTube(null);
  };

  return (
    <VStack spacing={6} align="center" mt={8} onClick={handleDeselect}>
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
        </Box>
      )}

      {tubes.length > 0 && (
        <HStack spacing={8} mt={4} onClick={(e) => e.stopPropagation()}>
          {tubes.map((tube, index) => (
            <Tube key={index} balls={tube} index={index} />
          ))}
        </HStack>
      )}
    </VStack>
  );
};

export default App;
