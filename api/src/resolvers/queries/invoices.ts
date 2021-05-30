import { IResolvers } from 'mercurius';

const invoiceQueries: IResolvers['Query'] = {
  async invoices(root, args, ctx, info) {
    return await ctx.app.models.Invoice.aggregate([
      { $set: { id: '$_id' } },
      { $unset: ['_id'] },
      {
        $lookup: {
          from: 'transactions',
          let: { id: '$id' },
          pipeline: [{ $match: { $expr: { $eq: ['$$id', '$invoice'] } } }],
          as: 'transactions',
        },
      },
      { $set: { transaction: { $arrayElemAt: ['$transactions', 0] } } },
      { $unset: ['transactions'] },
    ]);
  },
};

export default invoiceQueries;
