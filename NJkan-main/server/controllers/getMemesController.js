import Upload from "../models/Upload.js";
import User from "../models/User.js";
import Admin from "../models/Admin.js";
import BadRequestError from "../errors/bad-request.js";
import { nanoid } from "nanoid";
import mongoose from "mongoose";
import uploadFile from "../utils/s3.js";
import musicFile from "../utils/musicFile.js";
import { request } from "express";
import { UploadMemeValidations } from "../validations/UploadMemeValidations.js";

const getAllMemes = async (req, res) => {

    try{
 
    const allMemes = await Upload.find();
    res.status(200).json({ allMemes});
    }
    catch(e){
        res.status(500).json({error: "Invalid request"})
    }
};

export { getAllMemes };
