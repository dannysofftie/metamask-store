// @ts-check
import { Button, useColorModeValue } from '@chakra-ui/react';

/**
 *
 * @param {import('@chakra-ui/button').ButtonProps} props
 * @returns
 */
const WarningButton = props => {
  return (
    <Button
      backgroundColor={useColorModeValue('orange.400', 'orange.500')}
      _hover={{
        backgroundColor: useColorModeValue('orange.500', 'orange.700'),
        color: useColorModeValue('white', 'white'),
      }}
      color={useColorModeValue('white', 'white')}
      {...props}
    >
      {/*  */}
    </Button>
  );
};

export default WarningButton;
