import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {GreeterDataSource} from '../datasources';
import {Greeter} from '../interfaces';

export class GreeterProvider implements Provider<Greeter> {
  constructor(
    @inject('datasources.Greeter')
    protected dataSource: GreeterDataSource = new GreeterDataSource(),
  ) {}

  value(): Promise<Greeter> {
    return getService(this.dataSource);
  }
}
