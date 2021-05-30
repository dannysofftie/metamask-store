import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, chakra, Flex, HStack, IconButton, useColorMode, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import { DangerButton, PrimaryButton } from 'components/buttons';
import { OriginalLogo } from 'components/logo';
import ThemeSwitch from 'components/theme';
import { useGenerateNonceMutation, useSignatureVerificationMutation } from 'hooks/auth';
import { Fragment, useContext, useEffect, useRef, useState } from 'react';
import { BiChevronRightCircle, BiLogOut, BiMenu, BiWindowClose } from 'react-icons/bi';
import { sharedValues, UserContext } from 'state';
import { bgColor, deleteCookie, setCookie } from 'utils';
import Web3 from 'web3';
import DesktopNavigation from './desktop';
import MobileNavigation from './mobile';

const navItems = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Invoices',
    href: '/account',
  },
  // {
  //   label: 'Transactions',
  //   href: '/account/transactions',
  // },
];

const nonAuthNavItems = [
  {
    label: 'Home',
    href: '/',
  },
];

const ErrorPopUpModal = ({ isOpen, onClose, title, message, buttonText }) => {
  const cancelRef = useRef();

  return (
    <Fragment>
      <AlertDialog motionPreset='slideInBottom' leastDestructiveRef={cancelRef} onClose={onClose} isOpen={isOpen} isCentered>
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>{title}</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>{message}</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              {buttonText}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Fragment>
  );
};

const WebsiteNav = () => {
  const { colorMode } = useColorMode();
  const userContext = useContext(UserContext);
  const mobileNav = useDisclosure();
  const [publicAddress, setPublicAddress] = useState(null);
  const [ethereumNotFound, noAccountFound, verificationFailed] = [useDisclosure(), useDisclosure(), useDisclosure()];
  const { mutateAsync: generateNonceMutation, isLoading: mutationLoading, data: nonceResponse } = useGenerateNonceMutation();
  const { mutateAsync: verificationMutation, isLoading: verificationLoading, data: verificationResponse } = useSignatureVerificationMutation();

  const menuItems = userContext.state?.authenticated ? navItems : nonAuthNavItems;

  const executeSignIn = async () => {
    if (!Web3.givenProvider) {
      ethereumNotFound.onOpen();
      return { error: 'Metamask extension could not be found' };
    }

    const web3 = new Web3(Web3.givenProvider);
    const accounts = await web3.eth.getAccounts();

    if (!accounts.length) {
      return noAccountFound.onOpen();
    }
    // set local state & generate nonce
    setPublicAddress(accounts[0]);
    generateNonceMutation({ address: accounts[0] });
  };

  const verifyUserSignature = async () => {
    const web3 = new Web3(Web3.givenProvider);
    // use metamask to sign nonce
    const signature = await web3.eth.personal.sign(nonceResponse?.nonce, publicAddress);

    verificationMutation({ input: { signature, address: publicAddress } }).then(() => {
      if (verificationResponse?.error?.message) {
        return verificationFailed.onOpen();
      }
    });
  };

  const logOutUser = () => {
    deleteCookie(sharedValues.userToken);
    deleteCookie(sharedValues.userAccount);
    userContext.dispatch({ type: 'SIGNOUT_USER' });
  };

  useEffect(() => {
    nonceResponse?.nonce && verifyUserSignature();
  }, [nonceResponse]);

  // verification response,
  // set context and allow user to view invoices
  useEffect(() => {
    if (verificationResponse?.payload?.token) {
      setCookie({ key: sharedValues.userToken, value: verificationResponse?.payload?.token });
      setCookie({ key: sharedValues.userAccount, value: JSON.stringify(verificationResponse?.payload?.user) });
      userContext.dispatch({ type: 'SIGNIN_USER', payload: { authenticated: true, ...verificationResponse?.payload } });
    }
  }, [verificationResponse]);

  return (
    <Box>
      <ErrorPopUpModal
        //
        isOpen={ethereumNotFound.isOpen}
        onClose={ethereumNotFound.onClose}
        title={'Metamask not found!'}
        message={'Metamask Chrome/Firefox browser extension is required. Please install from Chrome or Firefox add-on store'}
        buttonText={'Okay'}
      />
      <ErrorPopUpModal
        //
        isOpen={noAccountFound.isOpen}
        onClose={noAccountFound.onClose}
        title={'Account not found!'}
        message={'Public address could not be obtained! Refresh the page to retry'}
        buttonText={'Okay'}
      />
      <ErrorPopUpModal
        //
        isOpen={verificationFailed.isOpen}
        onClose={verificationFailed.onClose}
        title={'Verification failed!'}
        message={'Could not authenticate!. Account verification failed.'}
        buttonText={'Close'}
      />
      <Flex bg={bgColor[colorMode]} color={useColorModeValue('gray.600', 'white')} minH={'60px'} py={{ base: 2 }} px={{ base: 4 }} align={'center'} justifyContent='space-between'>
        <Flex flex={{ base: 1, md: 'auto' }} ml={{ base: -2 }} display={{ base: 'flex', md: 'none' }}>
          <IconButton onClick={mobileNav.onOpen} icon={mobileNav.isOpen ? <BiWindowClose /> : <BiMenu />} variant={'ghost'} aria-label={'Toggle Navigation'} />
        </Flex>
        <Flex flex={{ base: 1 }} align='center'>
          <OriginalLogo href='/' />
          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNavigation navItems={menuItems} />
          </Flex>
        </Flex>
        <HStack spacing='5' position='absolute' right='2'>
          {userContext.state?.authenticated ? (
            <DangerButton rightIcon={<BiLogOut />} onClick={logOutUser}>
              Log Out
            </DangerButton>
          ) : (
            <chakra.a>
              <PrimaryButton rightIcon={<BiChevronRightCircle />} onClick={executeSignIn} isLoading={mutationLoading}>
                Sign In
              </PrimaryButton>
            </chakra.a>
          )}
          <ThemeSwitch />
        </HStack>
      </Flex>
      <MobileNavigation navItems={menuItems} isOpen={mobileNav.isOpen} onClose={mobileNav.onClose} />
    </Box>
  );
};

export default WebsiteNav;
