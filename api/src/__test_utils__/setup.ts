import { createMercuriusTestClient } from 'mercurius-integration-testing';
import App from '../bin/www';

export const setupTestEnv = () => {
  const fastify = new App();
  // @ts-ignore
  global.graphQlClient = createMercuriusTestClient(fastify.app);

  beforeAll(async () => {
    // start server
    await fastify.start();
    // drop database, use any collection to access the database instance
    await fastify.app.models.Invoice.db.dropDatabase();
  });

  afterAll(async () => {
    // close database
    await fastify.app.models.Invoice.db.close();
    // close fastify app instance
    await fastify.app.close();
  });
};
