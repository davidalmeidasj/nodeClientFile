import { Router } from 'express';
import multer from 'multer';
import { uploadFile } from '../controllers/fileController';

const router = Router();
const upload = multer({ dest: 'uploads/' });

/**
 * @swagger
 * /api/files:
 *   post:
 *     summary: Upload a CSV file
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: file
 *         type: file
 *         description: The CSV file to upload
 *     responses:
 *       200:
 *         description: The file was uploaded successfully
 *       400:
 *         description: No file uploaded or invalid file type
 *       500:
 *         description: Internal server error
 */
router.post('/api/files', upload.single('file'), uploadFile);

export default router;
