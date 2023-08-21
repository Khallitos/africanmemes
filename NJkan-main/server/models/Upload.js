import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UploadSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 3,
  },

 

  Genre: {
    type: String,
    minlength: 3,

  },

  Key: {
    type: String,
    minlength: 3,

  },


  email: {
    type: String,

  },

  downloadCount: {
    type: Number,
    default: 0,
  },

  username: {
    type: String,
  }
});

export default mongoose.model("memes", UploadSchema);
