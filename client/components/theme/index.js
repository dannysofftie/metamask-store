// @ts-check
import React from 'react';
import { IconButton, useColorMode } from '@chakra-ui/react';
import { BiMoon, BiSun } from 'react-icons/bi';

const ThemeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const iconColor = {
    light: 'black',
    dark: 'white',
  };

  return <IconButton title='Theme switch' aria-label='Toggle dark mode' icon={colorMode === 'dark' ? <BiSun /> : <BiMoon />} onClick={toggleColorMode} color={iconColor[colorMode]} />;
};

export default ThemeSwitch;
