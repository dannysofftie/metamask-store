import { Document, model, Schema } from 'mongoose';

export interface IUser {
  id?: any;
  publicAddress: string;
  nonce: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserDocument extends IUser, Document {}

const user = new Schema(
  {
    publicAddress: String,
    nonce: String,
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

export const User = model<IUserDocument>('users', user);
