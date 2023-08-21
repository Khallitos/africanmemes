import AWS from "aws-sdk";

const ID = process.env.AWS_ID;
const SECRET = process.env.AWS_SECRET_KEY;
const BUCKET_NAME = "kanmusic";

const s3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET,
  version: "latest",
  region: "eu-west-2",
  signatureVersion: "v4",
});

const musicFile = async (filename,songid) => {
  const params = {
    Bucket: BUCKET_NAME,
    Key: songid,
    Expires: 60 * 5, // the signed URL will expire after 5 minutes
    ResponseContentDisposition: `attachment; filename=${filename}`,
  };
  const signedUrl = s3.getSignedUrl("getObject", params);

  console.log("Signed URL: ", signedUrl);
};

export default musicFile;
