import React from 'react'
import { Box, Typography } from "@mui/material";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import SearchIcon from "@mui/icons-material/Search";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LanguageIcon from "@mui/icons-material/Language";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Link from "next/link";

const footerTop = {
    marginTop: "45px",
    left: "0",
    bottom: "0",
    position: "static",
    display: "flex",
    backgroundColor: "#3c3939",
    flexDirection: "column",
    marginBottom: "70px",
    alignItems: "center",
    justifyContent: "center",
    padding: {
      xs: "20px",
    },
    marginX: {
      xs: "auto",
    },
  };
  
const Subfooter = () => {
  return (
    <Box sx={footerTop}>
        <Typography variant="p"> Copyright © Kanmusiz 2023.</Typography>
      </Box>
  )
}

export default Subfooter
