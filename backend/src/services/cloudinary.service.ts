import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

class CloudinaryService {
  constructor() {
    // Configure Cloudinary from backend environment settings
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dyd2r4hnb',
      api_key: process.env.CLOUDINARY_API_KEY || '519642674996969',
      api_secret: process.env.CLOUDINARY_API_SECRET || 'aKzS7X42468sN04x982S',
    });
  }

  /**
   * Uploads a file buffer directly to Cloudinary using streams.
   * Avoids saving temporary files on disk.
   */
  public async uploadBuffer(fileBuffer: Buffer, originalName: string): Promise<{ secure_url: string; public_id: string }> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'insightU',
          resource_type: 'auto', // Seamlessly supports images, PDFs, docs
        },
        (error, result) => {
          if (error) {
            console.error('[CloudinaryService] Upload stream failure:', error);
            return reject(error);
          }
          if (!result) {
            return reject(new Error('Empty result received from Cloudinary server.'));
          }
          resolve({
            secure_url: result.secure_url,
            public_id: result.public_id,
          });
        }
      );

      // Stream the buffer into the upload stream
      const readable = new Readable();
      readable.push(fileBuffer);
      readable.push(null); // End of stream
      readable.pipe(uploadStream);
    });
  }
}

export default new CloudinaryService();
