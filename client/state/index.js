export const sharedValues = {
  userToken: '__tk___',
  userAccount: '___us__',
  graphqlEndoint: process.env.GRAPHQL_ENDPOINT,
  graphqlWsEndoint: process.env.GRAPHQL_WS_ENDPOINT,
};

export * from 'state/users.context';
