// @ts-check
import { GraphQLClient } from 'graphql-request';
import { useEffect } from 'react';
import { sharedValues } from 'state';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { getCookie } from 'utils';

export * from './auth';
export * from './invoices';

/**
 * Custom graphQl request
 *
 * @param {import('graphql-request/dist/types').RequestDocument} query
 * @param {{variables?: {[key: string]: any}}} param1
 * @returns
 */
export const graphqlQuery = async (query, { variables } = {}) => {
  const client = new GraphQLClient(sharedValues.graphqlEndoint, {
    headers: {
      Authorization: `Bearer ${getCookie(sharedValues.userToken)}`,
    },
  });
  return await client
    .request(query, variables || {})
    .then(res => res?.data)
    .catch(err => {
      return { ...err?.response?.errors, error: err?.response?.errors?.name };
    });
};

export const SubscribeToGraphQLWs = ({ query = null, onData = data => {} }) => {
  useEffect(() => {
    const client = new SubscriptionClient(sharedValues.graphqlWsEndoint, { reconnect: true });
    client.request({ query }).subscribe({
      next: response => {
        onData(response.data);
      },
      complete: () => {},
      error: err => console.log('Error', err),
    });
  }, []);

  return <span />;
};
