import React, { useEffect, useState,useRef  } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import { useAppContext } from "../context/AppContext";
import PageBtn from "../components/PageBtn";
import { Box, Button, Modal, Typography } from "@mui/material";
import { Margin } from "@mui/icons-material";
import ReactPlayer from "react-player";

const cardDesign = {

  marginBottom: "5px",
  p: {
    fontWeight: "bold",
    textDecoration: "none",
  },
  width: "300px",
  alignItems:"center",
  justifyContent:"center"

 
};


const Cards = ({ title, Genre, VideoKey }) => {
  const {
    getAllSongs,
    AllSongs,
    page,
    searchSong,
    deleteThisSong,
    approveThisSong,
    isPageReloaded,
  } = useAppContext();

  const [search, setSearch] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [posterUrl, setPosterUrl] = useState(null);
  const videoRef = useRef(null);

  const [openApprovals, setOpenApprovals] = React.useState(false);
  const ApprovalPromptOpen = () => setOpenApprovals(true);
  const ApprovalPromptClose = () => setOpenApprovals(false);

  const Search = (e) => {
    searchSong(search);
  };

  const getSongs = () => {
    getAllSongs();
  };
  const deleteSong = (id) => {
    deleteThisSong(id);
    handleClose();
  };
  const approveSong = (id) => {
    approveThisSong(id);
    ApprovalPromptClose();
  };

  
  const handleVideoReady = (player) => {
    // Get the internal player instance
    const videoElement = player.getInternalPlayer();
    
    const captureTime = videoElement.duration / 2;
    videoElement.currentTime = captureTime;

    videoElement.addEventListener("seeked", function () {
      const canvas = document.createElement("canvas");
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      const ctx = canvas.getContext("2d");

      ctx.drawImage(
        videoElement,
        0,
        0,
        canvas.width,
        canvas.height
      );
      
      setPosterUrl(canvas.toDataURL());
    });
  };
  return (
    <Box sx={cardDesign}>
   <div>
      <ReactPlayer
        url={`https://kanmusic.s3.eu-west-2.amazonaws.com/${VideoKey}`}
        width="300px"
        height="200px"
        controls
        onReady={handleVideoReady}
      />

      <div
        style={{
          width: "300px",
          height: "200px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {posterUrl && (
          <img
            src={posterUrl}
            alt="Video Poster"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        )}
      </div>

      <div>
        <p>{title}</p>
      </div>
    </div>
    </Box>
  );
};

export default Cards;
