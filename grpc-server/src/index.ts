import {Application} from '@loopback/core';
import {GrpcComponent} from '@loopback/grpc';
import {GreeterController} from './controllers';
import {ApplicationConfig, GrpcServerApplication} from './application';
export * from './application';

export async function main(options: ApplicationConfig = {}) {
  const app = new GrpcServerApplication(options);
  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  // Pass the optional configurations
  const grpcApp = new Application({
    grpc: {
      port: 4001,
    },
  });
  // Add Grpc as Component
  grpcApp.component(GrpcComponent);
  // Bind GreeterCtrl to the LoopBack Application
  grpcApp.controller(GreeterController);
  // Start App
  grpcApp.start();

  return app;
}

if (require.main === module) {
  // Run the application
  const config = {
    rest: {
      port: +(process.env.PORT ?? 4000),
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
