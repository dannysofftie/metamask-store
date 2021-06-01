import { createMercuriusTestClient } from 'mercurius-integration-testing';
import { IModels } from './src/models';

declare global {
  let graphQlClient: ReturnType<typeof createMercuriusTestClient>;
}

declare module 'fastify' {
  interface FastifyInstance {
    models: IModels;
  }
}
