// @ts-check
import { Flex, useColorMode } from '@chakra-ui/react';
import styled from '@emotion/styled';
import withAuthentication from 'components/hoc/auth';
import React, { Fragment } from 'react';
import { bgColor } from 'utils';
import WebsiteNav from './nav';

const WebsiteLayout = ({ children }) => {
  const { colorMode } = useColorMode();

  const color = {
    light: 'black',
    dark: 'white',
  };

  const StickyNav = styled(Flex)`
    position: sticky;
    z-index: 10;
    top: 0;
    backdrop-filter: saturate(180%) blur(20px);
    transition: height 0.5s, line-height 0.5s;
  `;

  return (
    <Fragment>
      <StickyNav flexDirection='row' justifyContent='space-between' alignItems='center' maxWidth='1024px' minWidth='356px' width='100%' bg={bgColor[colorMode]} as='nav' px={[2, 6, 6]} py={2} mt={8} mb={[0, 0, 8]} mx='auto'>
        {/* <Box> */}
        <WebsiteNav />
        {/* </Box> */}
      </StickyNav>
      <Flex as='main' justifyContent='center' flexDirection='column' bg={bgColor[colorMode]} color={color[colorMode]} px={[0, 4, 4]} mt={[4, 8, 8]}>
        {children}
      </Flex>
    </Fragment>
  );
};

export default withAuthentication(WebsiteLayout);
