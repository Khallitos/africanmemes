import * as yup from "yup";

export const UploadMemeValidations = yup.object().shape({
  title: yup.string().trim().required("Title is required"),
  Genre: yup.string().trim().required("Genre is required"),
  //   file: yup
  //     .mixed()
  //     .required("Please select a file to upload")
  //     .test("fileType", "Invalid file format", (value) => {
  //       if (!value) return true;

  //       const acceptedFormats = ["video/mp4"];
  //       return acceptedFormats.includes(value.type);
  //     })
  //     .test("fileSize", "File size is too large", (value) => {
  //       if (!value) return true;

  //       const maxSize = 10 * 1024 * 1024; // 10 MB
  //       return value.size <= maxSize;
  //     }),
});
