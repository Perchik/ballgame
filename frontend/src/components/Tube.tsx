import React from "react";
import { Box, VStack } from "@chakra-ui/react";
import Ball from "./Ball";

interface TubeProps {
  balls: string;
}

const Tube: React.FC<TubeProps> = ({ balls }) => {
  const ballList = balls.split(""); // Split the string to get individual balls

  return (
    <Box
      width="60px"
      height="120px"
      border="2px solid black"
      borderRadius="0 0 30px 30px"
      borderTop="hidden"
      display="flex"
      justifyContent="flex-end"
      alignItems="center"
      padding="10px"
      mb={4}
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
