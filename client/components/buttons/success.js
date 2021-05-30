// @ts-check
import { Button, useColorModeValue } from '@chakra-ui/react';

/**
 *
 * @param {import('@chakra-ui/button').ButtonProps} props
 * @returns
 */
const SuccessButton = props => {
  return (
    <Button
      //
      backgroundColor={useColorModeValue('green.400', 'green.600')}
      _hover={{ backgroundColor: useColorModeValue('green.500', 'green.700') }}
      color={useColorModeValue('white', 'white')}
      {...props}
    />
  );
};

export default SuccessButton;
