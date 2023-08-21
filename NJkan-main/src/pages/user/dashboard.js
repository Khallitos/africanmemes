import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Link from "next/link";
import DashboardIcon from "@mui/icons-material/Dashboard";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { Box, Button, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { DashboardNavs, MobileNav, Subfooter } from "@/components";

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
  display:"flex",
  flexDirection: {
    xs:"column",
    lg:"row",
    md:"row",
    xl:"row",
    sm:"row"
  }
};
const dashboardInfo = {
  display:"flex", 
  marginTop:"30px",
   marginLeft:{
    xl:"400px",
    md:"50px",
    lg:"100px",
    xs:"70px",
    sm:"70px"
   }
}
const mobileDesign = {
  flexDirection: "row",
  marginX: "auto",
  display: {
    lg: "none",
    md: "none",
    xl: "none",
    sm: "none",
    xs: "flex",
  },
};
const DashboardDesign = {
  display: {
    xs: "none",
    sm: "none",
    xl: "flex",
    md: "flex",
    lg: "none",
  },
};

const style = {
  width: "100%",
  maxWidth: 360,
  bgcolor: "#3c3939",
};

const sideMenu = {
  display: {
    xs: "none",
    xl: "flex",
    md: "flex",
    sm: "flex",
    lg: "flex",
  },
};
const mainpage = {
  display: "flex",
  flexDirection: "row",
  marginLeft: "100px",
};
const Dashboard = () => {
  //   if(!token) return <CircularProgress sx={{position: "fixed", top: "50%", left: "50%", transform:"translate(-50%, -50%)"}} />

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Box sx={pageDesign}>
        <MobileNav/>

          <DashboardNavs/>
          <Box sx={dashboardInfo}>
            <Box
              sx={{
                border: "10px solid #1976d2",
                width: { 
                  sm:"100px",
                  xs:"150px",
                  xl:"200px",
                  lg:"200px",
                  md:"200px",
                },
                height: "100px",
                backgroundColor: "#1976d2",
                marginRight: "10px",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                fontWeight: "bold",
                fontFamily: "nexa",
                color: "white",
                borderRadius: "10px ",
                alignItems:"center",
                justifyItem:"center"
              }}
            >
              <Typography variant="p">Total Downloads</Typography>
            </Box>
            <Box
              sx={{
                border: "10px solid #7fe792",
                width: { 
                  sm:"100px",
                  xs:"100px",
                  xl:"200px",
                  lg:"200px",
                  md:"200px",
                },
                height: "100px",
                backgroundColor: "#7fe792",
                marginRight: "10px",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                fontWeight: "bold",
                fontFamily: "nexa",
                color: "black",
                borderRadius: "10px",
              }}
            >
              {" "}
              Pending songs
            </Box>
            <Box
              sx={{
                border: "10px solid #f96161",
                width: { 
                  sm:"100px",
                  xs:"100px",
                  xl:"200px",
                  lg:"200px",
                  md:"200px",
                },
                height: "100px",
                backgroundColor: "#f96161",
                marginRight: "10px",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                fontWeight: "bold",
                fontFamily: "nexa",
                color: "white",
                borderRadius: "10px",
              }}
            >
              Live songs
            </Box>
          </Box>
        </Box>
      </Box>
      <Subfooter />
    </>
  );
};

export default Dashboard;
