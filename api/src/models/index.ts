import fp from 'fastify-plugin';
import { connect as mongooseConnect, connection as mongooseConnection, Model } from 'mongoose';
import { configs } from '../configs';
import { IInvoiceDocument, Invoice } from './Invoice';
import { IUserDocument, User } from './User';

export interface IModels {
  Invoice: Model<IInvoiceDocument>;
  User: Model<IUserDocument>;
}

const models: IModels = {
  Invoice,
  User,
};

export default fp(async (app, opts) => {
  mongooseConnection.on('connected', () => console.log('🚀 Mongo connected successfully'));
  mongooseConnection.on('error', console.log);

  await mongooseConnect(configs.mongoUri, { useNewUrlParser: true, keepAlive: true, useCreateIndex: true, useUnifiedTopology: true, autoIndex: false });

  app.decorate('models', models);
});
