import React from "react";
import { Box, VStack } from "@chakra-ui/react";
import Ball from "./Ball";
import { useGameStore } from "../store/useGameStore";

interface TubeProps {
  balls: string;
  index: number;
}

const Tube: React.FC<TubeProps> = ({ balls, index }) => {
  const { selectedTubeIndex, selectTube } = useGameStore();

  const isSelected = selectedTubeIndex === index;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent deselecting when clicking on the tube itself
    if (isSelected) {
      selectTube(null);
    } else {
      selectTube(index);
    }
  };

  const ballList = balls.split(""); // Split the string to get individual balls

  return (
    <Box
      width="60px"
      height="120px"
      border="2px solid"
      borderWidth={isSelected ? "6px" : "2px"}
      borderColor={isSelected ? "green" : "black"}
      borderRadius="0 0 30px 30px"
      borderTop="hidden"
      boxSizing="border-box"
      display="flex"
      justifyContent="center"
      alignItems="center"
      onClick={handleClick}
      cursor="pointer"
      marginBottom={isSelected ? "0" : "4px"}
    >
      <VStack spacing={2}>
        {ballList.map((ball, index) => (
          <Ball key={index} color={ball} />
        ))}
      </VStack>
    </Box>
  );
};

export default Tube;
