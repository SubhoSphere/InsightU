import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import cloudinaryService from '../services/cloudinary.service';

// Configure multer to parse files in-memory up to a 10MB threshold
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
}).single('file');

class UploadController {
  /**
   * Securely handles file upload requests, streaming buffers directly to Cloudinary.
   */
  public async handleUpload(req: Request, res: Response, next: NextFunction): Promise<void> {
    upload(req, res, async (err) => {
      if (err) {
        res.status(400).json({ success: false, message: err.message || 'File size exceeds allowed limits.' });
        return;
      }

      try {
        if (!req.file) {
          res.status(400).json({ success: false, message: 'No file attachment payload detected.' });
          return;
        }

        const result = await cloudinaryService.uploadBuffer(req.file.buffer, req.file.originalname);
        
        res.status(200).json({
          success: true,
          data: {
            fileUrl: result.secure_url,
            fileKey: result.public_id,
            name: req.file.originalname,
          },
        });
      } catch (error) {
        next(error);
      }
    });
  }
}

export default new UploadController();
