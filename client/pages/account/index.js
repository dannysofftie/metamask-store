// @ts-check
import { chakra, Container, Flex, Spinner, useColorModeValue } from '@chakra-ui/react';
import withAuthentication from 'components/hoc/auth';
import Invoices from 'components/invoices';
import WesbiteLayout from 'components/layout/website';
import { useInvoicesQuery } from 'hooks';

const Dashboard = () => {
  const { data: invoices, isLoading: invoicesLoading } = useInvoicesQuery();

  return (
    <WesbiteLayout>
      <Container maxW='8xl'>
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
      </Container>
    </WesbiteLayout>
  );
};

export default withAuthentication(Dashboard, true);
