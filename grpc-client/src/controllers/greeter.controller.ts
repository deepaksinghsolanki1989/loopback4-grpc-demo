import {inject} from '@loopback/core';
import {get, param, response} from '@loopback/rest';
import {Greeter, HelloReply, HelloRequest} from '../interfaces';

export class GreeterController {
  constructor(
    @inject('services.Greeter')
    private greeter: Greeter,
  ) {}

  @get('/greeter/{name}')
  @response(200, {
    description: 'Hello World grPRC Response',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          title: 'GreeterResponse',
          properties: {
            message: {type: 'string'},
          },
        },
      },
    },
  })
  async myGreeterMethod(
    @param.path.string('name') name: string,
  ): Promise<HelloReply> {
    const params: HelloRequest = {name};
    return this.greeter.SayHello(params);
  }
}
