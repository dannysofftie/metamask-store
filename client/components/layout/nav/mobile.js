// @ts-check
import { chakra, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Icon, Stack, Text, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { PrimaryButton } from 'components/buttons';
import { OriginalLogo } from 'components/logo';
import { NextLink, uuidv4 } from 'utils';

const MobileNavigation = ({ navItems = [], onClose, isOpen }) => {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement='left'>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton color={useColorModeValue('inherit', 'gray.400')} />
          <DrawerHeader>
            <Stack textAlign='center'>
              <OriginalLogo href='/account' />
              <Text fontSize='sm' color={useColorModeValue('gray.800', 'gray.200')}>
                Metamask Wallet
              </Text>
            </Stack>
          </DrawerHeader>

          <DrawerBody>
            {navItems?.map(menu => {
              return (
                <chakra.ul listStyleType='none' title={menu.text} key={uuidv4()}>
                  {menu.items?.map(item => {
                    return (
                      <chakra.li key={uuidv4()}>
                        <NextLink href={item.link} passHref>
                          <chakra.a>
                            <PrimaryButton variant='ghost' width='full' justifyContent='start' leftIcon={<Icon as={item.icon} fontWeight='bold' fontSize={20} />} fontSize='sm'>
                              {item.text}
                            </PrimaryButton>
                          </chakra.a>
                        </NextLink>
                      </chakra.li>
                    );
                  })}
                </chakra.ul>
              );
            })}
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default MobileNavigation;
