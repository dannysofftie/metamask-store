import { IResolvers } from 'mercurius';

const invoiceMutations: IResolvers['Mutation'] = {
  async updateInvoiceTransaction(root, args, ctx, info) {
    // update transaction hash
    if (args.input?.transactionHash) {
      const exists = await ctx.app.models.Transaction.findOne({ transactionHash: args.input.transactionHash });
      if (!exists) {
        // create this transaction
        await ctx.app.models.Transaction.create({
          invoice: args.where.id,
          transactionHash: args.input.transactionHash,
        });
      }
    }

    // if blocks, add to existing transaction document
    if (args.input?.block) {
      await ctx.app.models.Transaction.updateOne(
        // intentional line break
        { transactionHash: args.input.block.transactionHash },
        { $push: { blocks: args.input.block } }
      );
    }

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
