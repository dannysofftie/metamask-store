import { Alert, chakra, Flex, Grid, Tag } from '@chakra-ui/react';
import Card from 'components/card';
import { gql } from 'graphql-request';
import { SubscribeToGraphQLWs, useUpdateInvoiceTransactionMutation } from 'hooks';
import { Fragment, useEffect, useState } from 'react';
import { BiCheck, BiCreditCard } from 'react-icons/bi';
import { useQueryClient } from 'react-query';
import { formatCurrency } from 'utils';
import Web3 from 'web3';

const Invoice = ({ invoice, web3, account }) => {
  const [transaction, updateTransaction] = useState(null);
  const { mutateAsync: updateInvoiceMutation } = useUpdateInvoiceTransactionMutation();

  // get transaction details
  useEffect(() => {
    (async () => {
      if (invoice?.transaction && web3) {
        const trans = await web3.eth.getTransaction(invoice.transaction);
        console.log(trans);
      }
    })();
  }, [invoice, web3]);

  const sendTransaction = async invoice => {
    web3.eth
      .sendTransaction({
        from: account,
        value: invoice?.amount * 423166645692910,
        to: '0x5CC2a54072830cbBf56df417a3c6a53ed5661164',
      })
      .on('transactionHash', receipt => {
        updateInvoiceMutation({ input: { transactionHash: receipt }, where: { id: invoice?.id } });
      })
      .on('confirmation', (blockNumber, receipt) => {
        updateInvoiceMutation({
          input: {
            block: {
              to: receipt?.to,
              from: receipt?.from,
              gasUsed: receipt?.gasUsed,
              type: receipt?.type,
              blockHash: receipt?.blockHash,
              blockNumber: receipt?.blockNumber,
              cumulativeGasUsed: receipt?.cumulativeGasUsed,
              transactionHash: receipt?.transactionHash,
              transactionIndex: receipt?.transactionIndex,
            },
          },
          where: { id: invoice?.id },
        });
      });
  };

  return (
    <Card key={invoice?.id} shadow='md' style={{ position: 'relative' }} height='100%'>
      {/* invoice number */}
      <Flex flexDir='row' justifyContent='space-between'>
        <chakra.p>{invoice?.name}</chakra.p>
        <Flex>
          <Tag>#{invoice?.number}</Tag>
          {invoice?.transaction ? (
            <Tag bg='green.400' color='white' ml={'5'}>
              <BiCheck />
            </Tag>
          ) : (
            <Tag bg='red.500' color='white' ml={'5'} cursor='pointer' onClick={() => sendTransaction(invoice)}>
              <BiCreditCard />
            </Tag>
          )}
        </Flex>
      </Flex>
      {/* description */}
      <Flex flexDirection='row' justifyContent='space-between' style={{ margin: '10px 0' }}>
        <chakra.p>{invoice?.description}</chakra.p>
        <chakra.p>{formatCurrency({ currency: 'USD', value: invoice?.amount })}</chakra.p>
      </Flex>
      {invoice?.transaction && !invoice?.transaction?.blocks?.length ? (
        <Alert status='warning'>
          <chakra.span>Pending confirmation</chakra.span>
        </Alert>
      ) : (
        invoice?.transaction?.blocks?.length && (
          <Alert status='success'>
            <chakra.span>{invoice?.transaction?.blocks?.length} confirmations</chakra.span>
          </Alert>
        )
      )}
    </Card>
  );
};

const Invoices = ({ invoices = [] }) => {
  const [stateWeb3, setStateWeb3] = useState(null);
  const [address, setAddress] = useState(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    (async () => {
      const web3 = new Web3(Web3.givenProvider);
      const accounts = await web3.eth.getAccounts();
      setStateWeb3(web3);
      setAddress(accounts[0]);
    })();
  }, []);

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
          // refetch invoices
          queryClient.refetchQueries(['invoices']);
        }}
      />

      <Grid mt={10} templateColumns={{ base: 'full', sm: 'repeat(2,1fr)', md: 'repeat(3,1fr)' }} gap='5' width='100%' pb='10'>
        {invoices.map(invoice => {
          return <Invoice web3={stateWeb3} account={address} invoice={invoice} key={invoice?.id} />;
        })}
      </Grid>
    </Fragment>
  );
};

export default Invoices;
