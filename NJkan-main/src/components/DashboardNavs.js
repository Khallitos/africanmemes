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
import { MobileNav, Subfooter } from "@/components";

const sideMenu = {
  display: {
    xs: "none",
    xl: "flex",
    md: "flex",
    sm: "flex",
    lg: "flex",
  },

  marginLeft: {
    xl: "400px",
    lg: "150px"
  }
};

const style = {
  width: "200px",
  maxWidth: 360,
  bgcolor: "#3c3939",
};

export default function DashboardNavs() {
  return (
    <Box sx={sideMenu}>
            <List sx={style} component="nav" aria-label="mailbox folders">
              <Divider />
              <Link
                href="/user/dashboard"
                style={{ textDecoration: "none", color: "orange" }}
              >
                <ListItem button divider>
                  <Button variant="" startIcon={<DashboardIcon />}>
                    Dashboard
                  </Button>
                </ListItem>
              </Link>
              <Link
                href="/uploadsong"
                style={{ textDecoration: "none", color: "orange" }}
              >
                <ListItem button divider>
                  <Button variant="" startIcon={<UploadFileIcon />}>
                    Upload Song
                  </Button>
                </ListItem>
              </Link>
              <Link
                href="/user/profile"
                style={{ textDecoration: "none", color: "orange" }}
              >
                <ListItem button>
                  <Button variant="" startIcon={<AccountCircleIcon />}>
                    Profile
                  </Button>
                </ListItem>
              </Link>

              <Divider light />
              <Link
                href="/user/editsong"
                style={{ textDecoration: "none", color: "orange" }}
              >
                <ListItem button>
                  <Button variant="" startIcon={<UploadFileIcon />}>
                    Edit Song
                  </Button>
                </ListItem>
              </Link>
            </List>
          </Box>
  );
}
