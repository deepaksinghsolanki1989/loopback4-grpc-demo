import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'Greeter',
  connector: 'grpc',
  host: 'localhost',
  port: 3000,
  spec: 'protos/greeter.proto',
  validate: false,
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class GreeterDataSource
  extends juggler.DataSource
  implements LifeCycleObserver
{
  static dataSourceName = 'Greeter';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.Greeter', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
