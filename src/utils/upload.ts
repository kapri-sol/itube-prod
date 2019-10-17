import aws from "aws-sdk";
import multer from "multer";
import "../env";
import multerS3 from "multer-s3";
// import {prisma} from "../../generated/prisma-client";
import { getExtOfFile } from "./fileManage";

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  region: "ap-northeast-2"
});

const upload = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: process.env.AWS_BUCKET,
    contentLength: 500000000,
    cacheControl: "max-age=31536000",
    metadata: function(req, file, cb) {
      cb(null, { fieldName: file.originalname });
    },
    key: function(req, file, cb) {
      const {
        headers: { fileid }
      } = req;
      cb(null, fileid + getExtOfFile(file.originalname));
    }
  })
});

export const uploadMiddleware = upload.single("file");

export const uploadController = (req, res) => {
  //   const {
  //     file: { filename }
  //   } = req;
  //   res.json(filename);
  //   const { file } = req;
  //   console.log(file);
  res.end();
};
