import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
  email: String,
  password: String,
  require: true,
});

const User = mongoose.model("User", userSchema);

export default User;
