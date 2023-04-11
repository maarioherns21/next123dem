import { HeadObjectCommand,  PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import sharp from "sharp";
import dotenv from "dotenv"
dotenv.config();

const s3 = new S3Client();
const BUCKET = process.env.AWS_BUCKET;

//this function uploads picture to the AWS Bucket
export const uploadToS3 = async ({ file, key1, imageType }) => {
  // const imageFile = `${key.replace(/\.[^/.]+$/, "")}.${imageType}`;
  try {
    const key = key1;
  
    const imageExists = await s3.send( new HeadObjectCommand({
          Bucket: BUCKET,
          Key: key,
        })
      ).then(() => true).catch(() => false);

    if (!imageExists) {
      const imageBuffer = await sharp(file.buffer)
        .toFormat(imageType)
        .toBuffer();
      await s3.send(
        new PutObjectCommand({
          Bucket: BUCKET,
          Key: key,
          Body: imageBuffer,
          ContentType: file.mimetype,
        })
      );

      return { key };
    }
  } catch (error) {
    console.log(error);
    return { error };
  }
}