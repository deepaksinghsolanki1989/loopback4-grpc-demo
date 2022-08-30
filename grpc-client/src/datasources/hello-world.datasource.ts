import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'HelloWorld',
  connector: 'grpc',
  host: 'localhost',
  port: 50051,
  spec: 'protos/helloworld.proto',
  validate: false
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class HelloWorldDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'HelloWorld';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.HelloWorld', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
