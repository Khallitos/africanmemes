import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputLabel,
  MenuItem,
  Select,
  CircularProgress,
} from "@mui/material/";
import { PersonIcon, LockIcon } from "@mui/icons-material/";
import { AccountCircleIcon } from "@mui/icons-material/AccountCircle";
import { useAppContext } from "../context/AppContext";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToastContainer, toast } from "react-toastify";
import { UploadMemeValidations } from "../components/Validations/UploadMemeValidations";
import "react-toastify/dist/ReactToastify.css";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import * as yup from "yup";
import {
  Alert,
  DashboardNavs,
  FormRowSelect,
  MobileNav,
  Subfooter,
  FilterBox,
} from "../components";
import { useRouter } from "next/router";

const pageDesign = {
  marginTop: "60px",
  marginX: {
    lg: 10,
    md: 10,
    xl: 10,
    sm: 2,
  },
  width: {
    xl: "600px",
    xs: "640px",
  },
  bottom: "0",
  display: "flex",
  flexDirection: {
    xs: "column",
    lg: "row",
    md: "row",
    xl: "row",
    sm: "row",
  },

  img: {
    width: "100px",
    height: "100px",
  },
};

const deleteButton = {
  position: "absolute",
  marginTop: "500px",
};

const deleteButtonContainer = {
  position: "absolute",
  top: "0",
  right: "0",
  zIndex: "1",
  margin: "10px",
  fontSize: "24px", // Set the font size for the delete icon
  color: "red",
};

const videoContainer = {
  position: "relative",
};

const formDesign = {
  borderRadius: "10px solid #1976d2 !important",
  borderTop: "3px solid orange",
  margin: "auto",
  padding: "20px",
  color: "white",
  backgroundColor: "white",
};
const DefaultFilter = "Afrobeats";
const initialState = {
  title: "",
  Genre: "",
};
const formText = {
  fontSize: "30px",
  width: "300px",
  textColor: "white",
  height: "50px",
  marginBottom: "20px",
  borderRadius: "5px solid black",

  backgroundColor: "white",
};
const RegisterBox = {
  display: "flex",
  flexDirection: "column",
  alignItems: {
    lg: "center",
    xs: "",
  },
  justifyContent: "center",
  paddingX: "30px",
  marginX: {
    lg: "25%",
    md: "25%",
    xl: "25%",
    sm: "20",
    xs: "auto",
  },
  marginTop: {
    lg: "10px",
    md: "10px",
    xl: "10px",
    sm: "10px",
    xs: "20px",
  },
  width: {
    sm: "400px",
    lg: "600px",
    xl: "1000px",
  },
  marginLeft: {
    xl: "100px",
    lg: "100px",
    md: "150px",
  },
  marginBottom: "100px",
};

const UploadSong = () => {
  const [values, setValues] = useState(initialState);
  const [loadingMeme, setLoadingMeme] = useState(false);
  const [loadingMemeComplete, setLoadingMemeComplete] = useState(false);
  const router = useRouter();
  const [video, setVideo] = useState({
    file: "",
    memeVideo: "",
    message: "",
    success: false,
  });

  const {
    displayEmptyErr,
    displayPasswordMismatchErr,
    showAlert,
    setupUser,
    Filter,
    Genre,
    alertText,
    DefaultFilter,
    uploadVideo,
    uploadErrorHandler,
    email,
  } = useAppContext();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // const deleteMemeVideo = (e)=>{

  // }

  const uploadButton = {
    width: "300px",
    color: "black",
    marginBottom: "5px",
    backgroundColor: "orange",
    "&:hover": {
      backgroundColor: "black",
      color: "orange",
    },
  };

  const uploadButton2 = {
    width: "300px",
    color: "black",

    marginBottom: "5px",
    backgroundColor: "orange",
    "&:hover": {
      backgroundColor: "black",
      color: "orange",
    },
  };

  const submitButton = {
    width: "300px",
    color: "white",
    marginBottom: "10px",
    backgroundColor: "orange",
    "&:hover": {
      backgroundColor: "black",
      color: "orange",
    },
  };

  const handleVideoUpload = async (e) => {
    setLoadingMeme(true);
    if (!e.target.files || e.target.files.length === 0) {
      toast.error("Please upload a meme file", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setLoadingMeme(false);
      return;
    }

    let reader = new FileReader();
    let file = e.target.files[0];

    const FileValidations = () => {
      const size = file.size;
      const type = file.type;
      const videoType = type.replace("video/", "");

      if (size > 20000000) {
        setLoadingMemeComplete(false);
        toast.error("File size should be under 20MB", {
          position: toast.POSITION.TOP_RIGHT,
        });
        return false;
      }
      if (videoType !== "mp4" && videoType !== "mkv" && videoType !== "avi") {
        setLoadingMemeComplete(false);
        toast.error(
          "Invalid File Format. Videos should be in MP4, MKV, or AVI format",
          {
            position: toast.POSITION.TOP_RIGHT,
          }
        );
        return false;
      }
      return true;
    };

    if (FileValidations()) {
      reader.onloadend = () => {
        setVideo({
          ...video,
          file: file,
          memeVideo: URL.createObjectURL(file),
          message: "",
        });
        setLoadingMemeComplete(true); // Set loadingMemeComplete to true here
        setLoadingMeme(false);
      };

      reader.readAsDataURL(file);
    } else {
      setLoadingMemeComplete(false); // Set loadingMemeComplete to false here
      setLoadingMeme(false);
    }
  };

  const UploadMeme = async (e) => {
    e.preventDefault();
    if (!video.file) {
      toast.error("Please upload meme", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    const MemeDetails = {
      title: values.title,
      Genre: values.Genre,
    };

    try {
      const checkValidations = await UploadMemeValidations.validate(
        MemeDetails,
        { abortEarly: false }
      );

      if (checkValidations) {
        let formData = new FormData();
        formData.append("file", video.file);
        formData.append("title", values.title);
        formData.append("Genre", values.Genre);

        uploadVideo({
          formData,
        });

        // setVideo({ ...video, memeVide: "" });
        // setValues({ ...values, title: "", Genre: "", description: "", artist: "" });
      } else {
        toast.error("No evidence", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (errors) {
      if (errors && errors.inner) {
        errors.inner.forEach((error) => {
          toast.error(error.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
      } else {
      }
    }

    // const { title, description, Genre } = values;

    // if (!title || !description || !Genre) {
    //   displayEmptyErr();
    //   return;
    // }
    // const songDetails = { title, description, Genre, video };
  };
  useEffect(() => {
    if (showAlert) {
      if (alertText === "Meme uploaded successfully") {
        toast.success(alertText, {
          position: toast.POSITION.TOP_RIGHT,
        });

        router.push("/");

        // Clean up the timeout when the component unmounts
        
        
      } else {
        toast.error(alertText, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  }, [showAlert, alertText]);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Box sx={pageDesign}>
          <MobileNav />

          <DashboardNavs />
          <Box sx={RegisterBox}>
            <ToastContainer />
            <Box sx={formDesign}>
              {/* Title*/}

              <Typography
                variant="h6"
                sx={{
                  marginBottom: "5px",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "black",
                }}
              >
                Meme Title
              </Typography>
              <TextField
                sx={formText}
                margin="normal"
                required
                fullWidth
                id="outlined-required"
                label="Title"
                name="title"
                value={values.title}
                autoComplete="title"
                onChange={handleChange}
                InputLabelProps={{
                  style: { color: "black" },
                }}
                InputProps={{
                  style: {
                    color: "black",
                  },
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  marginBottom: "4px",
                  justifyContent: "flex-start",
                }}
              >
                {/* Title */}
                <Typography
                  variant="h6"
                  sx={{
                    marginBottom: "5px",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "black",
                  }}
                >
                  Category
                </Typography>
                <FormRowSelect
                  labelText="Genre"
                  sx={{ width: "200px" }}
                  id="outlined-required"
                  name="Genre"
                  value={values.Genre}
                  handleChange={handleChange}
                  list={Genre}
                  defaultValue={"Afrobeats"}
                />
              </Box>

              {video.message && <h3>{video.message}</h3>}
              <form>
                <Box sx={{ marginTop: "20px" }}>
                  <Typography
                    variant="h6"
                    sx={{
                      marginBottom: "5px",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "black",
                    }}
                  >
                    Add Meme
                  </Typography>

                  {loadingMeme ? (
                    <Button
                      variant="contained"
                      component="label"
                      color="primary"
                      sx={{ width: "300px" }}
                    >
                      Loading ...
                    </Button>
                  ) : loadingMemeComplete ? (
                    <Button
                      variant="contained"
                      component="label"
                      color="success"
                      sx={{ width: "300px" }}
                      endIcon={<DoneAllIcon />}
                    >
                      Successfully Loaded
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      component="label"
                      startIcon={<CloudUploadIcon />}
                      sx={uploadButton}
                    >
                      Upload meme
                      <input
                        type="file"
                        // accept=".png, .jpg, .jpeg"
                        id="video"
                        name="file"
                        hidden
                        onChange={handleVideoUpload}
                      />
                    </Button>
                  )}

                  {/* {loadingMeme && (
                    <CircularProgress
                      sx={{
                        position: "fixed",
                        top: "60%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                    />
                  )} */}

                  {video.memeVideo && (
                    <video controls width="300px" height="200px">
                      <source src={video.memeVideo} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}

                  {video.memeVideo && (
                    <Button
                      variant="contained"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={(e) =>
                        setVideo(
                          { ...video, memeVideo: "" },
                          setLoadingMemeComplete(false)
                        )
                      }
                    >
                      Delete
                    </Button>
                  )}
                </Box>

                <Box sx={{ marginTop: "30px" }}>
                  <Button
                    variant="contained"
                    sx={uploadButton}
                    onClick={UploadMeme}
                  >
                    <Typography variant="p"> submit </Typography>
                  </Button>
                </Box>
              </form>
            </Box>
          </Box>
        </Box>
      </Box>
      <Subfooter />
    </>
  );
};

export default UploadSong;
