import axios from 'axios';
import {graphqlHTTP} from 'express-graphql';
import {createGraphQLSchema} from 'openapi-to-graphql';
import {
  ApplicationConfig,
  RestServerApplication as LoopbackServerApplication,
} from './application';

export * from './application';

export async function main(options: ApplicationConfig = {}) {
  const app = new LoopbackServerApplication(options);
  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  const graphqlPath = '/graphql';

  // replace with process.env.{active-environment} once deployments setup
  const openApiSchema = 'http://localhost:3000/openapi.json';

  const oas = await axios
    .get(openApiSchema)
    .then(response => {
      console.log(`JSON schema loaded successfully from ${openApiSchema}`);
      return response.data;
    })
    .catch((err: any) => {
      console.error('ERROR: ', err);
      throw err;
    });

  const {schema} = await createGraphQLSchema(oas, {
    strict: false,
    viewer: true,
    baseUrl: url,
    headers: {
      'X-Origin': 'GraphQL',
    },
    tokenJSONpath: '$.jwt',
  });
  const handler = graphqlHTTP(
    (request: any, response: any, graphQLParams: any) => ({
      schema,
      pretty: true,
      graphiql: true,
      context: {jwt: getJwt(request)},
    }),
  );

  // Get the jwt from the Authorization header and place in context.jwt, which is then referenced in tokenJSONpath
  function getJwt(req: any) {
    if (req.headers && req.headers.authorization) {
      return req.headers.authorization.replace(/^Bearer /, '');
    }
  }

  app.mountExpressRouter(graphqlPath, handler);

  console.log(`Graphql API: ${url}${graphqlPath}`);
  return app;
}

export function restServer() {
  // Run the application
  const config = {
    rest: {
      port: +(process.env.PORT ?? 3000),
      host: process.env.HOST,
      // The `gracePeriodForClose` provides a graceful close for http/https
      // servers with keep-alive clients. The default value is `Infinity`
      // (don't force-close). If you want to immediately destroy all sockets
      // upon stop, set its value to `0`.
      // See https://www.npmjs.com/package/stoppable
      gracePeriodForClose: 5000, // 5 seconds
      openApiSpec: {
        // useful when used with OpenAPI-to-GraphQL to locate your application
        setServersFromRequest: true,
      },
    },
  };
  main(config).catch(err => {
    console.error('Cannot start the application.', err);
    process.exit(1);
  });
}
