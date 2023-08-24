import Upload from "../models/Upload.js";
import User from "../models/User.js";
import Admin from "../models/Admin.js";
import BadRequestError from "../errors/bad-request.js";
import { nanoid } from "nanoid";
import mongoose from "mongoose";
import uploadFile from "../utils/s3.js";
import musicFile from "../utils/musicFile.js";
import { request } from "express";
import {UploadMemeValidations} from "../validations/UploadMemeValidations.js"

const uploadmeme = async (req, res) => {
  try {
    const memeFile = req.files.file;
    const MemeDetails = req.body;
    const size = memeFile[0].size;
    const mimetype = memeFile[0].mimetype;
    const mimevalue = mimetype.split("/")[1]; // Extract the MIME type value
    const Key = nanoid() + "." + mimevalue;
    const buffer = memeFile[0].buffer;

  

    const checkValidations = await UploadMemeValidations.validate(MemeDetails, {
      abortEarly: false,
    });

    if (checkValidations) {

      if(!memeFile){
        throw new BadRequestError("Please upload meme file");
      }
      if (size > 20000000) {
                 
        throw new BadRequestError("File size should be under 20MB");
      }
      const allowedMimeTypes = ["mp4", "mkv", "avi"];

      if (!allowedMimeTypes.includes(mimevalue)) {
        throw new BadRequestError("Invalid file format");
      }

      const upload = uploadFile(buffer, Key);
      if (!upload) {
        throw new BadRequestError("File not uploaded");
      }
      const { title, Genre } = MemeDetails
      const uploadData = await Upload.create({ title, Genre, Key });

      if (!uploadData) {
        throw new BadRequestError("Please upload image files");
      }
      return res.status(201).json({ message: "Meme uploaded successfully" });
    }
  } catch (error) {
   
      throw new BadRequestError(error);
  
};
}


export {
  uploadmeme,

};
