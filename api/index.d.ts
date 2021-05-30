import { IModels } from './src/models';

declare module 'fastify' {
  interface FastifyInstance {
    models: IModels;
  }
}
