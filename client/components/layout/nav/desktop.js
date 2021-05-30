// @ts-check
import { Box, chakra, Flex, Icon, Link, Popover, PopoverContent, PopoverTrigger, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { Fragment } from 'react';
import { BiChevronRight } from 'react-icons/bi';
import { NextLink } from 'utils';

const DesktopSubNav = ({ label, href, subLabel }) => {
  return (
    <Fragment>
      {!href?.includes('http') ? (
        <chakra.span>
          <NextLink href={href ?? '#'} passHref>
            <chakra.a role={'group'} display={'block'} p={2} rounded={'md'} _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}>
              <Stack direction={'row'} align={'center'}>
                <Box>
                  <Text transition={'all .3s ease'} _groupHover={{ color: 'pink.400' }} fontWeight={500}>
                    {label}
                  </Text>
                  <Text fontSize={'sm'}>{subLabel}</Text>
                </Box>
                <Flex transition={'all .3s ease'} transform={'translateX(-10px)'} opacity={0} _groupHover={{ opacity: '100%', transform: 'translateX(0)' }} justify={'flex-end'} align={'center'} flex={1}>
                  <Icon color={'pink.400'} w={5} h={5} as={BiChevronRight} />
                </Flex>
              </Stack>
            </chakra.a>
          </NextLink>
        </chakra.span>
      ) : (
        <Link role={'group'} display={'block'} p={2} rounded={'md'} _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}>
          <Stack direction={'row'} align={'center'}>
            <Box>
              <Text transition={'all .3s ease'} _groupHover={{ color: 'pink.400' }} fontWeight={500}>
                {label}
              </Text>
              <Text fontSize={'sm'}>{subLabel}</Text>
            </Box>
            <Flex transition={'all .3s ease'} transform={'translateX(-10px)'} opacity={0} _groupHover={{ opacity: '100%', transform: 'translateX(0)' }} justify={'flex-end'} align={'center'} flex={1}>
              <Icon color={'pink.400'} w={5} h={5} as={BiChevronRight} />
            </Flex>
          </Stack>
        </Link>
      )}
    </Fragment>
  );
};

const DesktopNavigation = ({ navItems = [] }) => {
  return (
    <Stack direction={'row'} spacing={4}>
      {navItems.map(navItem => {
        return (
          <Box key={navItem.label}>
            <Popover trigger={'hover'} placement={'bottom-start'}>
              <PopoverTrigger>
                {!navItem.href?.includes('http') ? (
                  <chakra.span>
                    <NextLink href={navItem.href ?? '#'}>
                      <chakra.a
                        p={2}
                        href={navItem.href ?? '#'}
                        fontSize={'sm'}
                        fontWeight={500}
                        color={useColorModeValue('gray.600', 'gray.200')}
                        _hover={{
                          textDecoration: 'none',
                          color: useColorModeValue('gray.800', 'white'),
                        }}
                      >
                        {navItem.label}
                      </chakra.a>
                    </NextLink>
                  </chakra.span>
                ) : (
                  <Link
                    p={2}
                    href={navItem.href ?? '#'}
                    fontSize={'sm'}
                    fontWeight={500}
                    color={useColorModeValue('gray.600', 'gray.200')}
                    _hover={{
                      textDecoration: 'none',
                      color: useColorModeValue('gray.800', 'white'),
                    }}
                  >
                    {navItem.label}
                  </Link>
                )}
              </PopoverTrigger>

              {navItem.children && (
                <PopoverContent border={0} boxShadow={'xl'} bg={useColorModeValue('white', 'gray.800')} p={4} rounded={'xl'} minW={'sm'}>
                  <Stack>
                    {navItem.children.map(child => (
                      <DesktopSubNav key={child.label} {...child} />
                    ))}
                  </Stack>
                </PopoverContent>
              )}
            </Popover>
          </Box>
        );
      })}
    </Stack>
  );
};

export default DesktopNavigation;
