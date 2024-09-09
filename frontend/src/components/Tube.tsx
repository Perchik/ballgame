import React from "react";
import { Box, VStack } from "@chakra-ui/react";
import Ball from "./Ball";
import { useGameStore } from "../store/useGameStore";

interface TubeProps {
  balls: string;
  index: number;
}

const Tube: React.FC<TubeProps> = ({ balls, index }) => {
  const { selectedTubeIndex, selectTube, moveBall } = useGameStore();

  const isSelected = selectedTubeIndex === index;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent deselecting when clicking on the tube itself
    if (selectedTubeIndex === null) {
      selectTube(index);
    } else if (selectedTubeIndex === index) {
      // Deselect if already selected
      selectTube(null);
    } else {
      // If another tube is already selected, attempt to move the balls
      moveBall(index);
    }
  };

  const ballList = balls.split("").reverse(); // Split the string to get individual balls, reverse to make the top of the tube be the end of the array.

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
      alignItems="flex-end"
      paddingBottom={isSelected ? "5px" : "8px"}
      onClick={handleClick}
      cursor="pointer"
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
