import { Box, Container, Flex } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import { chakra, useColorModeValue } from '@chakra-ui/system';
import Invoices from 'components/invoices';
import WebsiteLayout from 'components/layout/website';
import { useInvoicesQuery } from 'hooks';
import { useContext } from 'react';
import { UserContext } from 'state';

const HomePage = () => {
  const { data: invoices, isLoading: invoicesLoading } = useInvoicesQuery();
  const userContext = useContext(UserContext);

  return (
    <WebsiteLayout>
      <Container maxW='8xl'>
        {!userContext.state.authenticated ? (
          <Flex h='40vh' flexDir='column' alignItems='center' justifyContent='center'>
            <chakra.img objectFit='scale-down' h={300} src='/img/lock-icon.png' />
            <chakra.p pr={{ base: 0, lg: 16 }} mb={4} fontSize='lg' color={useColorModeValue('brand.600', 'gray.400')} letterSpacing='wider'>
              Sign in to view and pay for pending invoices
            </chakra.p>
          </Flex>
        ) : (
          <Box>
            <chakra.p pr={{ base: 0, lg: 16 }} mb={4} fontSize='lg' color={useColorModeValue('brand.600', 'gray.400')} letterSpacing='wider'>
              Pay for invoices below using Ethereum. You can open to view invoice before making the payment
            </chakra.p>

            {invoicesLoading ? (
              <Flex justifyContent='center'>
                <Spinner />
              </Flex>
            ) : (
              <Invoices invoices={invoices} />
            )}
          </Box>
        )}
      </Container>
    </WebsiteLayout>
  );
};

export default HomePage;
