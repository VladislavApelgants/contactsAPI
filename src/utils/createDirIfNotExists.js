import fs from 'node:fs/promises';
export const createDirIFNotExist = async (url) => {
  try {
    await fs.access(url);
  } catch (err) {
    if (err.code === 'ENOENT') await fs.mkdir(url);
  }
};
