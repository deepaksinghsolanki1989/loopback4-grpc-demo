import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {HelloWorldDataSource} from '../datasources';
import {Greeter} from '../interfaces';

export class GreeterProvider implements Provider<Greeter> {
  constructor(
    // HelloWorld must match the name property in the datasource json file
    @inject('datasources.HelloWorld')
    protected dataSource: HelloWorldDataSource = new HelloWorldDataSource(),
  ) {}

  value(): Promise<Greeter> {
    return getService(this.dataSource);
  }
}
