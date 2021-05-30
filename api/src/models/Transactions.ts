import { Document, model, Schema, Types } from 'mongoose';

export interface ITransactionBlock {
  id?: any;
  to: string;
  from: string;
  gasUsed: number;
  type: string;
  blockHash: string;
  blockNumber: string;
  cumulativeGasUsed: number;
  transactionHash: string;
  transactionIndex: string;
}

export interface ITransaction {
  id?: any;
  invoice: Types.ObjectId;
  transactionHash: string;
  blocks: ITransactionBlock[];
}

export interface ITransactionDocument extends ITransaction, Document {}

const blockSchema = new Schema(
  {
    to: String,
    from: String,
    gasUsed: Number,
    type: String,
    blockHash: String,
    blockNumber: Number,
    cumulativeGasUsed: Number,
    transactionHash: String,
    transactionIndex: Number,
  },
  { timestamps: true }
);

const transaction = new Schema(
  {
    invoice: Types.ObjectId,
    transactionHash: String,
    blocks: [blockSchema],
  },
  { timestamps: true }
);

export const Transaction = model<ITransactionDocument>('transactions', transaction);
