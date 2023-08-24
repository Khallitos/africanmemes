import React, { useEffect, useState } from "react";
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
  return (
    <Box sx={cardDesign}>
      <Box>
        {/* <video controls width="300px" height="200px">
          <source
            src={`https://kanmusic.s3.eu-west-2.amazonaws.com/${VideoKey}`}
            type="video/mp4"
          />
        </video> */}
        <ReactPlayer
         url ={`https://kanmusic.s3.eu-west-2.amazonaws.com/${VideoKey}`} 
        
          width="300px" 
          height="200px"
        />
        
        <Box>
          <Typography
            gutterBottom
            variant="p"
            component="div"
            sx={{ marginLeft: "4px", color: "white", fontSize: "20px" ,fontWeight:"20px" }}
          >
            {title}
          </Typography>
        </Box>
      </Box>

      {/* <CardActions>
      <Button size="small">Share</Button>
      <Button size="small">like</Button>
    </CardActions> */}
      {/* Review song */}
    </Box>
  );
};

export default Cards;
