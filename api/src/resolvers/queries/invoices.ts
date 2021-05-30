import { IResolvers } from 'mercurius';

const invoiceQueries: IResolvers['Query'] = {
  async invoices(root, args, ctx, info) {
    return await ctx.app.models.Invoice.aggregate([
      // intentional line break
      { $set: { id: '$_id' } },
      { $unset: ['_id'] },
    ]);
  },
};

export default invoiceQueries;
