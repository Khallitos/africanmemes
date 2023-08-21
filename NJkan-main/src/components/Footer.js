import React from "react";
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

const footerDesign = {
  position: "fixed",
  left: "0",
  bottom: "0",
  width: "100%",
  backgroundColor: "red",
  color: "white",
  textAlign: "center",
  display: "flex",
  justifyContent: "space-around",
  height: "60px",
  backgroundColor: "#3c3939",
};


  const footerLink = {
    textDecoration: "none",
    color:"white"
  };
const footerButtonDesign = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};
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

const Footer = () => {
  return (
    <Box>
      
      <Box sx={footerDesign}>
        <Link href ="/trends" style={footerLink}>
        <Box sx={footerButtonDesign}>
          <LocalFireDepartmentIcon sx={{ fontSize: "30px", color: "orange" }} />
          <Typography variant="p" sx={{ fontSize: "13px" }}>
            Trends
          </Typography>
        </Box>
        </Link>
        <Link href ="/" style={footerLink}>
        <Box sx={footerButtonDesign}>
          <LanguageIcon sx={{ fontSize: "30px" }} />
          <Typography variant="p" sx={{ fontSize: "13px" }}>
            Search
          </Typography>
        </Box>
        </Link>
        <Link href ="/login" style={footerLink}>
        <Box sx={footerButtonDesign}>
          <DashboardIcon sx={{ fontSize: "30px" }} />
          <Typography variant="p" sx={{ fontSize: "13px" }}>
            Lib
          </Typography>
        </Box>
        </Link>
      </Box>
    </Box>
  );
};

export default Footer;
