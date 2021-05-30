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
          updateInvoiceTransaction(input: $input, where: $where) {
            message
          }
        }
      `,
      { variables: { input: params?.input, where: params?.where } }
    );
  });
};
