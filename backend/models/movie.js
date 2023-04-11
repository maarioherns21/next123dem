import mongoose from "mongoose";
const Schema  =  mongoose.Schema


const movieSchema = new Schema({
  name: String,
  body: String,
  creator: String,
  image: String,
  likes: { type: [String], default: [] },
  comments: { type: [String], default: [] },
  createdAt: { type: Date, default: new Date() },
});

const PIC = mongoose.model("PIC" , movieSchema)

export default PIC





