import { default as queries } from './queries';
import { default as mutations } from './mutations';
import { IResolvers } from 'mercurius';

const subscriptions: IResolvers['Subscription'] = {
  invoiceUpdated: {
    subscribe: async (root, args, ctx, info) => {
      return await ctx.pubsub.subscribe('invoiceUpdated');
    },
  },
};

export default {
  Mutation: mutations,
  Query: queries,
  Subscription: {
    ...subscriptions,
  },
};
