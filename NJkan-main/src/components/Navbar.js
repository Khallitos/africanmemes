import React, { useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { red } from "@mui/material/colors";
import { Button, Hidden, Divider } from "@mui/material";
import { GpsFixed } from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import SettingsIcon from "@mui/icons-material/Settings";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import links from "../utils/links";
// import SET_INITIALSTATE from "../context/"

const phoneNavbar = {
  flexGrow: 1,
  display: { lg: "none", md: "none", xl: "none", xs: "flex", sm: "flex" },
  backgroundColor: "#e6e6e6",
  marginTop: "10px",
  "@media (max-width: 900px)": {},
};

const linkDesign = {
  display: {
    xs: "none",
    md: "flex",
    sm: "flex",
    xl: "flex",
  },
};

const linkStyle = {
  textDecoration: "none",
};
const MainBox = {
  display: "flex",
  background: "#666",
  height: "50px",
  alignItems: "center",
  flexDirection: "row",
  justifyContent: "space-around",
  position:"fixed",
  zIndex:"1",
  width:"100%",
  top: "0px"
// right: 0px; 
// left: 0px;
  

};
const MenuDesign = {
  display:{
    lg:"none",
    md:"none",
    xl:"none",
    
  }
}

const loginButtonDesign = {};
const pages = ["Afrobeats", "Hiphop", "Amapiano", "Highlife", "Gospel"];

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  margin: "50px",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "white",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Navbar = () => {
  const { username, logUserOff, token, setLocalStorage } = useAppContext();
  const router = useRouter();
  const logoutUser = () => {
    logUserOff();
    window.location.reload();
  };

  return (
    <>
    
      <Box sx={MainBox}>
        <Head>
        <link href="https://fonts.cdnfonts.com/css/nexa-bold" rel="stylesheet" />
                
        </Head>
      <MenuIcon  sx={MenuDesign}/>
        <Box sx={{ display: "flex" }}>
        
          <Link href="/">
            
            <Typography
              variant="p"
              noWrap
              sx={{
                flexGrow: 1,
                display: { xs: "", sm: "block" },
                textDecoration: "none",
                color: "white",
                fontSize: "20px",
                fontWeight: "bold",
                marginRight:
                {
                  xs:"100px"
                }
                
              }}
            >
              AfricanMemes
            </Typography>
          </Link>
        </Box>

        <Box sx={linkDesign}>
          {links.map((link) => (
            <Link
              href={link.path}
              style={{ textDecoration: "none" }}
              key={link.id}
            >
              <Button
                key={link.id}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                {link.title}
              </Button>
            </Link>
          ))}
        </Box>

        {token && (
          <Box>
            <Typography variant="h5">
              <AccountCircleIcon fontSize="small" /> {username}
            </Typography>

            <Button
              variant="outlined"
              onClick={logoutUser}
              sx={{
                backgroundColor: "white",
                marginX: "30px",
                fontWeight: "bold",
                fontSize: "1rem",
                padding: "2px",
              }}
            >
              Logout
            </Button>
            <Button
              variant="text"
              color="primary"
              onClick={() => router.push("/")}
            >
              <SettingsIcon fontSize="large" sx={{ color: "white" }} />
            </Button>
          </Box>
        )}

        {!token && (
          <Box sx={loginButtonDesign}>
            <Button
              variant="outlined"
              onClick={() => router.push("/login")}
              sx={{
                backgroundColor: "orange",
                marginX: "30px",
                fontWeight: "bold",
                fontSize: "13px",
                color: "white",
                width: "70px",

                padding: "2px",
                "&:hover": {
                  borderRadius: "10px solid black",
                  color: "white",
                  background: "#e9b150",
                },
              }}
            >
              Login
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
};

export default Navbar;
