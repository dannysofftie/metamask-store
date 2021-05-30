// @ts-check
import { Button, useColorModeValue } from '@chakra-ui/react';

/**
 *
 * @param {import('@chakra-ui/button').ButtonProps} props
 * @returns
 */
const DangerButton = props => {
  return (
    <Button
      backgroundColor={useColorModeValue('red.500', 'red.600')}
      _hover={{
        backgroundColor: useColorModeValue('red.600', 'red.700'),
        color: useColorModeValue('white', 'white'),
      }}
      color={useColorModeValue('white', 'white')}
      {...props}
    >
      {/*  */}
    </Button>
  );
};

export default DangerButton;
