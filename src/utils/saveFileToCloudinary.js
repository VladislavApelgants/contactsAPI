import cloudinary from 'cloudinary';
import fs from 'node:fs/promises';
import path from 'node:path';
import { CLOUDINARY, TEMP_UPLOAD_DIR } from '../constants/index.js';
import { env } from './env.js';

cloudinary.v2.config({
  secure: true,
  cloud_name: env(CLOUDINARY.CLOUD_NAME),
  api_key: env(CLOUDINARY.API_KEY),
  api_secret: env(CLOUDINARY.API_SECRET),
});

export const saveFileToCloudinary = async (file) => {
  const responce = await cloudinary.v2.uploader.upload(file.path);
  await fs.unlink(path.join(TEMP_UPLOAD_DIR, file.filename));
  return responce.secure_url;
};
