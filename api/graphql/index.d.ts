import type { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import type { MercuriusContext } from 'mercurius';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type ResolverFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => Promise<import('mercurius-codegen').DeepPartial<TResult>> | import('mercurius-codegen').DeepPartial<TResult>;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  Number: any;
  _FieldSet: any;
};

export type User = {
  __typename?: 'User';
  id?: Maybe<Scalars['ID']>;
  publicAddress?: Maybe<Scalars['String']>;
  nonce?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Date']>;
  updatedAt?: Maybe<Scalars['Date']>;
};

export type Invoice = {
  __typename?: 'Invoice';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  number?: Maybe<Scalars['String']>;
  amount?: Maybe<Scalars['Number']>;
  description?: Maybe<Scalars['String']>;
  transaction?: Maybe<Transaction>;
  createdAt?: Maybe<Scalars['Date']>;
  updatedAt?: Maybe<Scalars['Date']>;
};

export type Transaction = {
  __typename?: 'Transaction';
  transactionHash?: Maybe<Scalars['String']>;
  blocks?: Maybe<Array<Maybe<TransactionBlock>>>;
};

export type TransactionBlock = {
  __typename?: 'TransactionBlock';
  to?: Maybe<Scalars['String']>;
  from?: Maybe<Scalars['String']>;
  gasUsed?: Maybe<Scalars['Number']>;
  type?: Maybe<Scalars['String']>;
  blockHash?: Maybe<Scalars['String']>;
  blockNumber?: Maybe<Scalars['String']>;
  cumulativeGasUsed?: Maybe<Scalars['Number']>;
  transactionHash?: Maybe<Scalars['String']>;
  transactionIndex?: Maybe<Scalars['Number']>;
};

export type NonceResponse = {
  __typename?: 'NonceResponse';
  nonce: Scalars['String'];
};

export type SignatureVerificationInput = {
  address?: Maybe<Scalars['String']>;
  signature?: Maybe<Scalars['String']>;
};

export type Error = {
  __typename?: 'Error';
  field?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
};

export type VerificationPayload = {
  __typename?: 'VerificationPayload';
  token?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type VerificationResponse = {
  __typename?: 'VerificationResponse';
  error?: Maybe<Error>;
  payload?: Maybe<VerificationPayload>;
};

export type UpdateWhereId = {
  id: Scalars['ID'];
};

export type TransactionBlockInput = {
  to?: Maybe<Scalars['String']>;
  from?: Maybe<Scalars['String']>;
  gasUsed?: Maybe<Scalars['Number']>;
  type?: Maybe<Scalars['String']>;
  blockHash?: Maybe<Scalars['String']>;
  blockNumber?: Maybe<Scalars['String']>;
  cumulativeGasUsed?: Maybe<Scalars['Number']>;
  transactionHash?: Maybe<Scalars['String']>;
  transactionIndex?: Maybe<Scalars['Number']>;
};

export type InvoiceTransactionInput = {
  transactionHash?: Maybe<Scalars['String']>;
  block?: Maybe<TransactionBlockInput>;
};

export type UpdateResponse = {
  __typename?: 'UpdateResponse';
  message?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  /** Request to get invoices */
  invoices?: Maybe<Array<Invoice>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Called when user signs in */
  generateNonce?: Maybe<NonceResponse>;
  /** Expects publicAddress and signature to verify if this publicAddress has signed the correct nonce */
  verifySignature?: Maybe<VerificationResponse>;
  /** Update invoice */
  updateInvoiceTransaction?: Maybe<UpdateResponse>;
};

export type MutationgenerateNonceArgs = {
  address: Scalars['String'];
};

export type MutationverifySignatureArgs = {
  input: SignatureVerificationInput;
};

export type MutationupdateInvoiceTransactionArgs = {
  input: InvoiceTransactionInput;
  where: UpdateWhereId;
};

export type Subscription = {
  __typename?: 'Subscription';
  /** Subscribe to this query to be notified when invoices gets updated */
  invoiceUpdated?: Maybe<Invoice>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> = SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs> | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> = ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>) | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (parent: TParent, context: TContext, info: GraphQLResolveInfo) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (next: NextResolverFn<TResult>, parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Date: ResolverTypeWrapper<Scalars['Date']>;
  Number: ResolverTypeWrapper<Scalars['Number']>;
  User: ResolverTypeWrapper<User>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Invoice: ResolverTypeWrapper<Invoice>;
  Transaction: ResolverTypeWrapper<Transaction>;
  TransactionBlock: ResolverTypeWrapper<TransactionBlock>;
  NonceResponse: ResolverTypeWrapper<NonceResponse>;
  SignatureVerificationInput: SignatureVerificationInput;
  Error: ResolverTypeWrapper<Error>;
  VerificationPayload: ResolverTypeWrapper<VerificationPayload>;
  VerificationResponse: ResolverTypeWrapper<VerificationResponse>;
  UpdateWhereId: UpdateWhereId;
  TransactionBlockInput: TransactionBlockInput;
  InvoiceTransactionInput: InvoiceTransactionInput;
  UpdateResponse: ResolverTypeWrapper<UpdateResponse>;
  Query: ResolverTypeWrapper<{}>;
  Mutation: ResolverTypeWrapper<{}>;
  Subscription: ResolverTypeWrapper<{}>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Date: Scalars['Date'];
  Number: Scalars['Number'];
  User: User;
  ID: Scalars['ID'];
  String: Scalars['String'];
  Invoice: Invoice;
  Transaction: Transaction;
  TransactionBlock: TransactionBlock;
  NonceResponse: NonceResponse;
  SignatureVerificationInput: SignatureVerificationInput;
  Error: Error;
  VerificationPayload: VerificationPayload;
  VerificationResponse: VerificationResponse;
  UpdateWhereId: UpdateWhereId;
  TransactionBlockInput: TransactionBlockInput;
  InvoiceTransactionInput: InvoiceTransactionInput;
  UpdateResponse: UpdateResponse;
  Query: {};
  Mutation: {};
  Subscription: {};
  Boolean: Scalars['Boolean'];
}>;

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export interface NumberScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Number'], any> {
  name: 'Number';
}

export type UserResolvers<ContextType = MercuriusContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  publicAddress?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  nonce?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type InvoiceResolvers<ContextType = MercuriusContext, ParentType extends ResolversParentTypes['Invoice'] = ResolversParentTypes['Invoice']> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  number?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  amount?: Resolver<Maybe<ResolversTypes['Number']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  transaction?: Resolver<Maybe<ResolversTypes['Transaction']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TransactionResolvers<ContextType = MercuriusContext, ParentType extends ResolversParentTypes['Transaction'] = ResolversParentTypes['Transaction']> = ResolversObject<{
  transactionHash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  blocks?: Resolver<Maybe<Array<Maybe<ResolversTypes['TransactionBlock']>>>, ParentType, ContextType>;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TransactionBlockResolvers<ContextType = MercuriusContext, ParentType extends ResolversParentTypes['TransactionBlock'] = ResolversParentTypes['TransactionBlock']> = ResolversObject<{
  to?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  from?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  gasUsed?: Resolver<Maybe<ResolversTypes['Number']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  blockHash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  blockNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  cumulativeGasUsed?: Resolver<Maybe<ResolversTypes['Number']>, ParentType, ContextType>;
  transactionHash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  transactionIndex?: Resolver<Maybe<ResolversTypes['Number']>, ParentType, ContextType>;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type NonceResponseResolvers<ContextType = MercuriusContext, ParentType extends ResolversParentTypes['NonceResponse'] = ResolversParentTypes['NonceResponse']> = ResolversObject<{
  nonce?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ErrorResolvers<ContextType = MercuriusContext, ParentType extends ResolversParentTypes['Error'] = ResolversParentTypes['Error']> = ResolversObject<{
  field?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type VerificationPayloadResolvers<ContextType = MercuriusContext, ParentType extends ResolversParentTypes['VerificationPayload'] = ResolversParentTypes['VerificationPayload']> = ResolversObject<{
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type VerificationResponseResolvers<ContextType = MercuriusContext, ParentType extends ResolversParentTypes['VerificationResponse'] = ResolversParentTypes['VerificationResponse']> = ResolversObject<{
  error?: Resolver<Maybe<ResolversTypes['Error']>, ParentType, ContextType>;
  payload?: Resolver<Maybe<ResolversTypes['VerificationPayload']>, ParentType, ContextType>;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UpdateResponseResolvers<ContextType = MercuriusContext, ParentType extends ResolversParentTypes['UpdateResponse'] = ResolversParentTypes['UpdateResponse']> = ResolversObject<{
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = MercuriusContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  invoices?: Resolver<Maybe<Array<ResolversTypes['Invoice']>>, ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = MercuriusContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  generateNonce?: Resolver<Maybe<ResolversTypes['NonceResponse']>, ParentType, ContextType, RequireFields<MutationgenerateNonceArgs, 'address'>>;
  verifySignature?: Resolver<Maybe<ResolversTypes['VerificationResponse']>, ParentType, ContextType, RequireFields<MutationverifySignatureArgs, 'input'>>;
  updateInvoiceTransaction?: Resolver<Maybe<ResolversTypes['UpdateResponse']>, ParentType, ContextType, RequireFields<MutationupdateInvoiceTransactionArgs, 'input' | 'where'>>;
}>;

export type SubscriptionResolvers<ContextType = MercuriusContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  invoiceUpdated?: SubscriptionResolver<Maybe<ResolversTypes['Invoice']>, 'invoiceUpdated', ParentType, ContextType>;
}>;

export type Resolvers<ContextType = MercuriusContext> = ResolversObject<{
  Date?: GraphQLScalarType;
  Number?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  Invoice?: InvoiceResolvers<ContextType>;
  Transaction?: TransactionResolvers<ContextType>;
  TransactionBlock?: TransactionBlockResolvers<ContextType>;
  NonceResponse?: NonceResponseResolvers<ContextType>;
  Error?: ErrorResolvers<ContextType>;
  VerificationPayload?: VerificationPayloadResolvers<ContextType>;
  VerificationResponse?: VerificationResponseResolvers<ContextType>;
  UpdateResponse?: UpdateResponseResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
}>;

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = MercuriusContext> = Resolvers<ContextType>;

type Loader<TReturn, TObj, TParams, TContext> = (
  queries: Array<{
    obj: TObj;
    params: TParams;
  }>,
  context: TContext & {
    reply: import('fastify').FastifyReply;
  }
) => Promise<Array<import('mercurius-codegen').DeepPartial<TReturn>>>;
type LoaderResolver<TReturn, TObj, TParams, TContext> =
  | Loader<TReturn, TObj, TParams, TContext>
  | {
      loader: Loader<TReturn, TObj, TParams, TContext>;
      opts?: {
        cache?: boolean;
      };
    };
export interface Loaders<TContext = import('mercurius').MercuriusContext & { reply: import('fastify').FastifyReply }> {
  User?: {
    id?: LoaderResolver<Maybe<Scalars['ID']>, User, {}, TContext>;
    publicAddress?: LoaderResolver<Maybe<Scalars['String']>, User, {}, TContext>;
    nonce?: LoaderResolver<Maybe<Scalars['String']>, User, {}, TContext>;
    createdAt?: LoaderResolver<Maybe<Scalars['Date']>, User, {}, TContext>;
    updatedAt?: LoaderResolver<Maybe<Scalars['Date']>, User, {}, TContext>;
  };

  Invoice?: {
    id?: LoaderResolver<Maybe<Scalars['ID']>, Invoice, {}, TContext>;
    name?: LoaderResolver<Maybe<Scalars['String']>, Invoice, {}, TContext>;
    number?: LoaderResolver<Maybe<Scalars['String']>, Invoice, {}, TContext>;
    amount?: LoaderResolver<Maybe<Scalars['Number']>, Invoice, {}, TContext>;
    description?: LoaderResolver<Maybe<Scalars['String']>, Invoice, {}, TContext>;
    transaction?: LoaderResolver<Maybe<Transaction>, Invoice, {}, TContext>;
    createdAt?: LoaderResolver<Maybe<Scalars['Date']>, Invoice, {}, TContext>;
    updatedAt?: LoaderResolver<Maybe<Scalars['Date']>, Invoice, {}, TContext>;
  };

  Transaction?: {
    transactionHash?: LoaderResolver<Maybe<Scalars['String']>, Transaction, {}, TContext>;
    blocks?: LoaderResolver<Maybe<Array<Maybe<TransactionBlock>>>, Transaction, {}, TContext>;
  };

  TransactionBlock?: {
    to?: LoaderResolver<Maybe<Scalars['String']>, TransactionBlock, {}, TContext>;
    from?: LoaderResolver<Maybe<Scalars['String']>, TransactionBlock, {}, TContext>;
    gasUsed?: LoaderResolver<Maybe<Scalars['Number']>, TransactionBlock, {}, TContext>;
    type?: LoaderResolver<Maybe<Scalars['String']>, TransactionBlock, {}, TContext>;
    blockHash?: LoaderResolver<Maybe<Scalars['String']>, TransactionBlock, {}, TContext>;
    blockNumber?: LoaderResolver<Maybe<Scalars['String']>, TransactionBlock, {}, TContext>;
    cumulativeGasUsed?: LoaderResolver<Maybe<Scalars['Number']>, TransactionBlock, {}, TContext>;
    transactionHash?: LoaderResolver<Maybe<Scalars['String']>, TransactionBlock, {}, TContext>;
    transactionIndex?: LoaderResolver<Maybe<Scalars['Number']>, TransactionBlock, {}, TContext>;
  };

  NonceResponse?: {
    nonce?: LoaderResolver<Scalars['String'], NonceResponse, {}, TContext>;
  };

  Error?: {
    field?: LoaderResolver<Maybe<Scalars['String']>, Error, {}, TContext>;
    message?: LoaderResolver<Maybe<Scalars['String']>, Error, {}, TContext>;
  };

  VerificationPayload?: {
    token?: LoaderResolver<Maybe<Scalars['String']>, VerificationPayload, {}, TContext>;
    user?: LoaderResolver<Maybe<User>, VerificationPayload, {}, TContext>;
  };

  VerificationResponse?: {
    error?: LoaderResolver<Maybe<Error>, VerificationResponse, {}, TContext>;
    payload?: LoaderResolver<Maybe<VerificationPayload>, VerificationResponse, {}, TContext>;
  };

  UpdateResponse?: {
    message?: LoaderResolver<Maybe<Scalars['String']>, UpdateResponse, {}, TContext>;
  };
}
declare module 'mercurius' {
  interface IResolvers extends Resolvers<import('mercurius').MercuriusContext> {}
  interface MercuriusLoaders extends Loaders {}
}
