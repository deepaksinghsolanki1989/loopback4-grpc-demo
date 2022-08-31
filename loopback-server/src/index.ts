import {grpcServer} from './server/grpc';
import {restServer} from './server/rest';

export * from './application';

if (true || process.env.SERVER_TYPE === 'grpc') {
  grpcServer();
} else {
  restServer();
}
