import { and, rule, shield } from 'graphql-shield';
import { MercuriusContext } from 'mercurius';

const isAuthenticated = rule({ cache: 'no_cache' })(async (root, args, ctx: MercuriusContext, info) => {
  //
  return true;
});

export default shield({
  Query: {
    invoices: and(isAuthenticated),
  },
  Mutation: {
    updateInvoiceTransaction: and(isAuthenticated),
  },
});
