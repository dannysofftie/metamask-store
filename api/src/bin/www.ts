import altairPlugin from 'altair-fastify-plugin';
import fastify, { FastifyInstance } from 'fastify';
import fastifyCors from 'fastify-cors';
import mercurius from 'mercurius';
import mercuriusCodegen from 'mercurius-codegen';
import { join } from 'path';
import { configs } from '../configs';
import models from '../models';
import { schema } from '../schema';

export default class App {
  private app: FastifyInstance;

  constructor() {
    this.app = fastify({ ignoreTrailingSlash: true, logger: { level: 'fatal' } });
    this.config();
  }

  async config() {
    this.app.setErrorHandler((err, req, res) => {
      console.log(err, req.raw.url, req.params);
      res.send(err);
    });
    await this.app.register(fastifyCors, { preflight: true, credentials: true, origin: true });
    await this.app.register(models);
    // register mercurius and graphql ide (altair)
    // @ts-expect-error this is to return custom error and remove stack trace
    await this.app.register(mercurius, {
      schema,
      path: '/graphql',
      queryDepth: 8,
      ide: false,
      graphiql: false,
      errorFormatter: execution => {
        const errors = execution.errors
          ?.map(a => ({
            name: a?.originalError?.name,
            message: a?.originalError?.message,
            statusCode: a?.originalError?.['statusCode'],
          }))
          .filter(b => b?.message);

        let statusCode = 403;

        switch (true) {
          case errors?.map(a => a?.name).includes('MISSING_TOKEN'):
            statusCode = 401;
            break;
          case errors?.map(a => a?.name).includes('PRIVILEGE'):
            statusCode = 403;
            break;

          // other error codes here
          // default to server error code
          default:
            statusCode = errors?.map(a => a?.statusCode)?.[0] || 500;
            break;
        }

        return {
          statusCode,
          response: { data: execution.data, errors: execution.errors },
        };
      },
      prefix: false,
      subscription: true,
    });

    await this.app.register(altairPlugin, { endpointURL: '/graphql', path: '/api/d/docs', baseURL: '/api/d/docs/', initialSettings: { theme: 'dracula' } });

    // generate schema in development to improve tooling
    process.env.NODE_ENV !== 'production' && mercuriusCodegen(this.app, { targetPath: join(process.cwd(), 'graphql', 'index.d.ts'), codegenConfig: { useIndexSignature: true, enumsAsTypes: true } });
  }

  async start() {
    await this.app.listen(configs.port, '0.0.0.0').catch(console.log);

    // graceful shutdown of all attached processes
    // 1. attached puppeteer browser instance
    // 2. attached prisma client to disconnect and close
    // 3. attached redis instance to disconnect and close
    for (const signal of ['SIGINT', 'SIGTERM', 'SIGHUP'] as NodeJS.Signals[]) {
      process.on(signal, () => process.exit());
    }

    console.log(`🚀 Server listening on`, this.app.server.address());
    process.on('uncaughtException', console.error);
    process.on('unhandledRejection', console.error);
  }
}
