import mongoose from "mongoose";
const Schema = mongoose.Schema



const userSchema = new Schema({
  email: { type: String, unique: true },
  username: String,
  password: String,
  image: String,
  createdAt: { type: Date, default: new Date() },
});

const User = mongoose.model('User', userSchema);

export default User