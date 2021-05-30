import { IResolvers } from 'mercurius';

const invoiceMutations: IResolvers['Mutation'] = {
  async updateInvoiceTransaction(root, args, ctx, info) {
    console.log({
      transaction: args.input,
    });
    ctx.pubsub.publish({
      topic: 'invoiceUpdated',
      payload: {
        invoiceUpdated: {
          transaction: args.input,
        },
      },
    });
    return { message: 'Updated successfully' };
  },
};

export default invoiceMutations;
