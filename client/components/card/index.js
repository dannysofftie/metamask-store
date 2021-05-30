// @ts-check
import React from 'react';
import { Box, Heading, Stack, Text, useColorModeValue } from '@chakra-ui/react';

/**
 * Reusable card component
 *
 * @param {{ children?: any; height?: string | number; title?: string;  subTitle?: string; shadow?: 'base' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'; style: import('react').CSSProperties}} param0
 * @returns
 */
const Card = ({ children, height = '-webkit-fit-content', shadow = 'sm', title = '', subTitle = '', style = {} }) => {
  return (
    <Box rounded={'lg'} maxW='100%' height={height} boxShadow={shadow} p={4} bg={useColorModeValue('gray.50', 'gray.700')} color={useColorModeValue('gray.800', 'gray.300')} style={style}>
      {title && (
        <Stack pl={2} mb={3}>
          <Heading size='sm'>{title}</Heading>
          {subTitle && (
            <Text color={useColorModeValue('gray.500', 'gray.400')} fontSize={'xs'}>
              {subTitle}
            </Text>
          )}
        </Stack>
      )}
      {children}
    </Box>
  );
};

export default Card;
