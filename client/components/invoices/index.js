import { chakra, Flex, Grid, Tag } from '@chakra-ui/react';
import Card from 'components/card';
import { gql } from 'graphql-request';
import { SubscribeToGraphQLWs, useUpdateInvoiceTransactionMutation } from 'hooks';
import { Fragment } from 'react';
import { BiCheck, BiCreditCard } from 'react-icons/bi';
import { formatCurrency } from 'utils';
import Web3 from 'web3';

const Invoice = ({ invoice }) => {
  const { mutateAsync: updateInvoiceMutation } = useUpdateInvoiceTransactionMutation();

  const sendTransaction = async invoice => {
    const web3 = new Web3(Web3.givenProvider);
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    web3.eth
      .sendTransaction({
        from: accounts[0],
        value: 600,
        to: '0x5CC2a54072830cbBf56df417a3c6a53ed5661164',
      })
      .on('transactionHash', receipt => {
        console.log(receipt, 'Transaction hash');
        updateInvoiceMutation({ input: { transactionHash: receipt }, where: { id: invoice?.id } });
      });
  };

  return (
    <Card key={invoice?.id} shadow='md' style={{ position: 'relative' }} height='100%'>
      {/* invoice number */}
      <Flex flexDir='row' justifyContent='space-between'>
        <chakra.p>{invoice?.name}</chakra.p>
        <Flex>
          <Tag>#{invoice?.number}</Tag>
          <Tag bg='green.400' color='white' ml={'5'}>
            <BiCheck />
          </Tag>
          <Tag bg='red.500' color='white' ml={'5'} cursor='pointer' onClick={() => sendTransaction(invoice)}>
            <BiCreditCard />
          </Tag>
        </Flex>
      </Flex>
      {/* description */}
      <Flex flexDirection='row' justifyContent='space-between' style={{ margin: '10px 0' }}>
        <chakra.p>{invoice?.description}</chakra.p>
        <chakra.p>{formatCurrency({ currency: 'USD', value: invoice?.amount })}</chakra.p>
      </Flex>
    </Card>
  );
};

const Invoices = ({ invoices = [] }) => {
  return (
    <Fragment>
      {/* subscribe to invoice updates */}
      <SubscribeToGraphQLWs
        query={gql`
          subscription invoiceUpdated {
            invoiceUpdated {
              id
              name
              number
              amount
              description
              transaction {
                transactionHash
                blocks {
                  to
                  from
                  gasUsed
                  type
                  blockHash
                  blockNumber
                  cumulativeGasUsed
                  transactionHash
                  transactionIndex
                }
              }
              createdAt
              updatedAt
            }
          }
        `}
        onData={data => {
          console.log(data);
        }}
      />

      <Grid mt={10} templateColumns={{ base: 'full', sm: 'repeat(2,1fr)', md: 'repeat(3,1fr)' }} gap='5' width='100%' pb='10'>
        {invoices.map(invoice => {
          return <Invoice invoice={invoice} key={invoice?.id} />;
        })}
      </Grid>
    </Fragment>
  );
};

export default Invoices;
