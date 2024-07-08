import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from './constants/index.js';
import { initMongoDB } from './db/initMongoDB.js';
import { server } from './server.js';
import { createDirIFNotExist } from './utils/createDirIfNotExists.js';

(async () => {
  await initMongoDB();
  await createDirIFNotExist(TEMP_UPLOAD_DIR);
  await createDirIFNotExist(UPLOAD_DIR);
  server();
})();
