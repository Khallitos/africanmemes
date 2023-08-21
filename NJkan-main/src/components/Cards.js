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

const cardDesign = {
  minHeight: "4rem",
  display: "flex",
  padding: "5px",
  backgroundColor: "#332e2e",

  width: {
    xs: "90%",
  },
  marginX: {
    xs: "auto"
  },

  img: {
    borderRadius: "1rem",
    left: "0",
    objectFit: "cover",
    filter: "brightness(70%)",
    width: "70px",
    height: "70px",
  },
  marginBottom: "20px",

  p: {
    fontWeight: "bold",
    textDecoration: "none",
  },
};

const Cards = ({ title, artist, Genre, description, songId, ImageKey }) => {
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
      <img
        src={`https://kanmusic.s3.eu-west-2.amazonaws.com/${ImageKey}`}
        alt=""
        sx={{width:"60px", height:"60px"}}
      />
      <Box>
        <Typography
          gutterBottom
          variant="p"
          component="div"
          sx={{ marginLeft: "4px", color: "white" ,fontSize:"16px"}}
        >
          {artist} - {title}
        </Typography>
        <Typography
          gutterBottom
          variant="p"
          component="div"
          sx={{ marginLeft: "4px", color: "white", fontSize:"13px" }}
        >
          Duration 3:12
        </Typography>
        <Typography variant="body2" color="text.secondary"></Typography>
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
