// @ts-check
import { Button, useColorModeValue } from '@chakra-ui/react';

/**
 *
 * @param {import('@chakra-ui/button').ButtonProps} props
 * @returns
 */
const PrimaryButton = props => {
  return (
    <Button
      //
      backgroundColor={useColorModeValue('blue.400', 'blue.600')}
      _hover={{ backgroundColor: useColorModeValue('blue.500', 'blue.700') }}
      color={useColorModeValue('white', 'white')}
      {...props}
    />
  );
};

export default PrimaryButton;
