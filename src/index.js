import { initMongoDB } from './db/initMongoDB.js';
import { server } from './server.js';

(async () => {
  await initMongoDB();
  server();
})();
