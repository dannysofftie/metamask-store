import { makeExecutableSchema } from '@graphql-tools/schema';
import { readFileSync } from 'fs';
import { applyMiddleware } from 'graphql-middleware';
import { gql } from 'mercurius-codegen';
import { join, resolve } from 'path';
import resolvers from '../resolvers';
import permissions from '../rules';

const graphqlRootPath = resolve('graphql');

const schemas = readFileSync(join(graphqlRootPath, 'schema.gql'));
const queries = readFileSync(join(graphqlRootPath, 'queries.gql'));
const mutations = readFileSync(join(graphqlRootPath, 'mutations.gql'));
const subscriptions = readFileSync(join(graphqlRootPath, 'subscriptions.gql'));

const typeDefs = gql`
  ${schemas}
  ${queries}
  ${mutations}
  ${subscriptions}
`;

export const schema = applyMiddleware(
  makeExecutableSchema({
    typeDefs,
    resolvers,
  }),
  permissions
);
