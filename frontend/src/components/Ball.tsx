import React from 'react';
import { Box } from '@chakra-ui/react';

interface BallProps {
  color: string;
}

const Ball: React.FC<BallProps> = ({ color }) => {
  const backgroundColor = color === 'a' ? 'red' : color === 'b' ? 'blue' : 'transparent';

  return (
    <Box
      width="40px"
      height="40px"
      borderRadius="50%"
      backgroundColor={backgroundColor}
      border="1px solid black"
      mb={2}
    />
  );
};

export default Ball;
