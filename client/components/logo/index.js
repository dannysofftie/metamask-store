import { chakra } from '@chakra-ui/react';
import { NextLink } from 'utils';

export const OriginalLogo = ({ href = '/' }) => {
  return (
    <NextLink href={href}>
      <chakra.img src='/img/logo_2.png' objectFit='scale-down' height={{ base: 10, md: 50 }} _hover={{ cursor: 'pointer' }} />
    </NextLink>
  );
};
