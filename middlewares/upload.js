import multer from 'multer';
import path from 'path';

const tempDir = path.join(process.cwd(), 'temp');

const storage = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 },
});

export default upload;
