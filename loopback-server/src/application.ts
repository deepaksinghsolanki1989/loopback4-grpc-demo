import {ApplicationConfig} from '@loopback/core';
import {GrpcServerApplication} from './server/grpc/application';
import {RestServerApplication} from './server/rest/application';

let LoopbackServerApplication;
if (true || process.env.SERVER_TYPE === 'grpc') {
  LoopbackServerApplication = GrpcServerApplication;
} else {
  LoopbackServerApplication = RestServerApplication;
}

export {ApplicationConfig, LoopbackServerApplication};
