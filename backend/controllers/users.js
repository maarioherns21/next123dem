import User from "../models/user.js";
////---s3/multer----///
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import multer, { memoryStorage } from 'multer';
import { uploadToS3 } from "../s3.mjs";
import dotenv from "dotenv"
import { S3Client } from "@aws-sdk/client-s3";
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
    const user = await User.find();

    res.status(200).json(user);
  } catch (error) {
    console.log(error);

    res.status(401).json({ message: error.message });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
   
    console.log(user)
   
    if (!user) return res.status(401).json({ message: "Invalid email or password" });
  
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });
    
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ token, user: { id: user._id , email: user.email , image: user.image, username: user.username } });
  } catch (error) {
    console.error(error.message);

    res.status(500).json({ message: 'Server error' });
  }
};


export const register = async (req, res) => {
  try {
    const { email, username: userId, password } = req.body;
    const { file } = req;

    const oldUser = await User.findOne({ email: email });

    if (oldUser) return res.json({ message: "User ALready exist" });

    // Hash the password before storing it in the database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    ////-----upload multer/s3 ----///

    const accept = accepts(req);
    const imageType = accept.type("avif", "webp");
    //folder on the bucket
    const key1 = `${userId}/${uuid()}.${imageType}`;

    //this  sents the props for image convertion and returns the key
    const { key: image } = await uploadToS3({ key1, file, imageType });

    ////-----upload multer/s3 ----///

    const newUser = new User({ email, username: userId, password: hashedPassword, image });

    const data = await newUser.save();

    const token = jwt.sign({ userId: data._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
   
    res.status(200).json({ token, user: { id: data._id , email: data.email , image: data.image, username: data.username } });
  } catch (error) {
    console.log(error);

    res.status(401).json({ message: error.message });
  }
};


//user Profile
export const profile = async (req, res) => {
  try {

    const userId = req.params.id
   
    const person = await User.findById(userId).select('-password');
     
     console.log(person)
    res.status(200).json(person)
    
  } catch (error) {
    console.log(error)

    res.status(404).json({message:  error.message})
  }
  };

