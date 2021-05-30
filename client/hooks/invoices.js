import { gql } from 'graphql-request';
import { graphqlQuery } from 'hooks';
import { useMutation, useQuery } from 'react-query';

export const useInvoicesQuery = () => {
  return useQuery('invoices', async () => {
    return await graphqlQuery(gql`
      query invoices {
        data: invoices {
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
              createdAt
              updatedAt
            }
          }
          createdAt
          updatedAt
        }
      }
    `);
  });
};

export const useUpdateInvoiceTransactionMutation = () => {
  return useMutation(async params => {
    return await graphqlQuery(
      gql`
        mutation updateInvoiceTransaction($input: InvoiceTransactionInput!, $where: UpdateWhereId!) {
          data: updateInvoiceTransaction(input: $input, where: $where) {
            message
          }
        }
      `,
      { variables: { input: params?.input, where: params?.where } }
    );
  });
};
