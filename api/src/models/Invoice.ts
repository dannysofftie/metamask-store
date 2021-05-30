import { Document, model, Schema } from 'mongoose';

export interface IInvoice {
  id?: any;
  name: string;
  number: string;
  description: string;
  amount: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IInvoiceDocument extends IInvoice, Document {}

const invoice = new Schema(
  {
    name: String,
    number: String,
    description: String,
    amount: Number,
  },
  { timestamps: true }
);

export const Invoice = model<IInvoiceDocument>('invoices', invoice);

const createInvoices = async () => {
  await Invoice.deleteMany({});
  await Invoice.create([
    {
      name: 'Budgeting proposal',
      number: '78909876',
      amount: 4000,
      description: 'Municipal council 2021/2022 town planning',
    },
    {
      name: 'TP Link switch',
      number: '08956342',
      amount: 19,
      description: 'TP Link purchase',
    },
    {
      name: 'Little sandwich shop',
      number: '34567875',
      amount: 782,
      description: 'Recarpeting and shelves renovation',
    },
    {
      name: 'Wireless cable company',
      number: '1287434',
      amount: 178.5,
      description: 'RJ-45 cables, clipping & laying cables underground',
    },
    {
      name: 'Liquid Telecom networks',
      number: '6785645',
      amount: 3478.4,
      description: 'Wi-Fi installation, & 4 Wi-Fi extenders ',
    },
  ]);
};

// createInvoices();
