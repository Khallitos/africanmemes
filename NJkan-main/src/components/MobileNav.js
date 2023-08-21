import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Link from "next/link";
import DashboardIcon from "@mui/icons-material/Dashboard";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { Box, Button } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Subfooter } from "@/components";


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
 const MobileNav = () => {
  return (
    <Box sx={mobileDesign}>
    <Box sx={{ marginRight: "10px" }}>
      <Link href="/user/dashboard" style={{ textDecoration: "none" }}>
        <Button
          sx={{
            color: "orange",
            backgroundColor: "#3c3939",
            variant: "contained",
          }}
          startIcon={<DashboardIcon />}
        >
          
        </Button>
      </Link>
    </Box>

    <Box sx={{ marginRight: "10px" }}>
      <Link href="/uploadsong" style={{ textDecoration: "none" }}>
        <Button
          startIcon={<UploadFileIcon />}
          sx={{
            color: "orange",
            backgroundColor: "#3c3939",
            variant: "contained",
          }}
        >
          Upload
        </Button>
      </Link>
    </Box>

    <Box sx={{ marginRight: "10px" }}>
      <Link href="/profile" style={{ textDecoration: "none" }}>
        <Button
          startIcon={<AccountCircleIcon />}
          sx={{
            color: "orange",
            backgroundColor: "#3c3939",
            variant: "contained",
          }}
        >
          profile
        </Button>
      </Link>
    </Box>
    <Box sx={{ marginRight: "10px" }}>
      <Link href="/editsong" style={{ textDecoration: "none" }}>
        <Button
          startIcon={<UploadFileIcon />}
          sx={{
            color: "orange",
            backgroundColor: "#3c3939",
            variant: "contained",
          }}
        >
          Edit
        </Button>
      </Link>
    </Box>
  </Box>
  )
}

export default MobileNav