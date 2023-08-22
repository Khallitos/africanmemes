import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import "express-async-errors";
import connectDb from "./db/connectDb.js";
import authRouter from "./routes/authRoutes.js";
import uploadRouter from "./routes/uploadRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import getmemesRouter from "./routes/getmemeRoutes.js"
import errorHandlerMiddleware from "./middleware/error-handler.js";
import multer from "multer";
import { nanoid } from "nanoid";
import path from "path";
import bodyParser from "body-parser";
import jwtChecker from "./middleware/jwtChecker.js";
import cors from "cors";

const app = express();

app.use(cors()); // Use this after the variable declaration
app.use(express.json({ limit: "10mb", extended: true }));
app.use(
  express.urlencoded({ limit: "10mb", extended: true, parameterLimit: 50000 })
);
dotenv.config();
const PORT = process.env.PORT_NO || 6000;
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

const storage = multer.memoryStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, `${file.originalname.split(".")[0]}.jpg`);
  },
});
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 30000000,
  },
  fileFilter(req, file, cb) {
    if (!file) {
      return cb(new Error("Please upload a coverart and a song"));
    }

    cb(null, true);
  },
});
const multipleUpload = upload.fields([{ name: "file" }, { name: "file1" }]);

app.use(express.static("./public"));
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/adminauth", jwtChecker, adminRouter);
app.use("/api/v1/upload", jwtChecker, multipleUpload, uploadRouter);
app.use("/api/v1/getmemes", jwtChecker, getmemesRouter);
app.use(errorHandlerMiddleware);

app.listen(PORT, () => console.log(`server is running ${PORT}`));

const start = async () => {
  try {
    const connect = await connectDb(process.env.MONGO_URI);
  } catch (error) {
    console.log(error);
  }
};
start();
