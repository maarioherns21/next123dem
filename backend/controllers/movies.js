import PIC from "../models/movie.js";

////---s3/multer----///
import multer, { memoryStorage } from 'multer';
import { uploadToS3 } from "../s3.mjs";
import dotenv from "dotenv"
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import accepts from "accepts"
const s3 = new S3Client();

import { v4 as uuid } from "uuid";

////---s3/multer----///


dotenv.config();

const bucket = process.env.AWS_BUCKET

///-------------AWS upload---------------- /////

const storage = memoryStorage();
export const upload = multer({ storage });




export const index = async (req, res) => {
  try {
    const movie = await PIC.find();

    res.status(200).json(movie);
  } catch (error) {
    console.log(error.message);

    res.status(404).json({ message: error.message });
  }
};

export const createMovie = async (req, res) => {
  try {
    const { name, body, creator: userId } = req.body;
    const { file } = req;
    console.log(req.body);

    ////-----upload multer/s3 ----///

    const accept = accepts(req);
    const imageType = accept.type("avif", "webp");
   //folder on the bucket 
    const key1 = `${userId}/${uuid()}.${imageType}`;

    //this  sents the props for image convertion and returns the key
    const { key } = await uploadToS3({ key1, file, imageType });

    ////-----upload multer/s3 ----///

    const saveData = new PIC({ name, body, creator: userId, image: key });

    const data = await saveData.save();

    res.setHeader('Cache-Control', 'max-age=3600');
    res.status(200).json({ data, key });
  } catch (error) {
    console.log(error.message);

    res.status(404).json({ message: error.message });
  }
};


export const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    
    //deletes the image from the bucket
    await s3.send(new DeleteObjectCommand({
        Bucket: bucket,
        Key: movie.fileImage
      }));

    const data = await PIC.findByIdAndDelete(id);

    res.status(200).json(data);
  } catch (error) {
    console.log(error.message);

    res.status(404).json({ message: error.message });
  }
};


export const updateMovie = async (req, res) => {
  try {
    const movie = req.body;
    const { id } = req.params;
    const newMOvie = { ...movie, _id: id };

    const data = await PIC.findByIdAndUpdate(id, newMOvie, { new: true });

    res.status(200).json(data);
  } catch (error) {
    console.log(error.message);

    res.status(404).json({ message: error.message });
  }
};


export const likeMovie = async (req, res) => {
  try {
    const { like } = req.body;
    const { id } = req.params;
    const movie = await PIC.findById(id);

    movie.likes.push(like);

    const data = await PIC.findByIdAndUpdate(id, movie, { new: true });

    res.status(200).json(data);
  } catch (error) {
    console.log(error.message);

    res.status(404).json({ message: error.message });
  }
};



export const commentMovie = async (req, res) => {
  try {
    const { comment } = req.body;
    const { id } = req.params;
    const movie = await PIC.findById(id);

    movie.comments.push(comment);

    const data = await PIC.findByIdAndUpdate(id, movie, { new: true });

    res.status(200).json(data);
  } catch (error) {
    console.log(error.message);

    res.status(404).json({ message: error.message });
  }
};
