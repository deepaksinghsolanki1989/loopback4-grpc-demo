import {grpc} from '@loopback/grpc';
import {Greeter, HelloReply, HelloRequest} from './greeter.proto';

/**
 * @class GreeterController
 * @description Implements grpc proto service
 **/
export class GreeterController implements Greeter.Service {
  constructor() {}
  // Tell LoopBack that this is a Service RPC implementation
  @grpc(Greeter.SayHello)
  sayHello(request: HelloRequest): HelloReply {
    return {message: `Hello ${request.name}`};
  }
}
