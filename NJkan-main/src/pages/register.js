import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Button } from "@mui/material/";
import { PersonIcon, LockIcon } from "@mui/icons-material/";
import { AccountCircleIcon } from "@mui/icons-material/AccountCircle";
import { useAppContext } from "../context/AppContext";
import { Alert, Subfooter } from "../components";
import Link from "next/link";

const RegisterBox = {
  display: "flex",
  flexDirection: "column",
  alignItems: {
    lg: "center",
    xs: "",
  },
  justifyContent: "center",
  paddingX: "2px",
  marginX: {
    lg: "25%",
    md: "25%",
    xl: "25%",
    sm: "20",
  },
  marginTop: {
    lg: "10%",
    md: "10%",
    xl: "10%",
    sm: "30%",
    xs: "30%",
  },
  width: {
    sm: "400px",
    lg: "600px",
    xl: "800px",
  },
};

//textfield
const formText = {
  fontSize: "100px",
  width: "300px",
  textColor: "white",

  backgroundColor: "white",
};

//s
const FormOuterCover = {};

//
const formDesign = {
  borderRadius: "10px solid #1976d2 !important",
  borderTop: "3px solid orange",
  margin: "auto",
  padding: "20px",
  color: "white",
  backgroundColor: "#666",
};

//login button
const loginbutton = {
  width: "300px",
  marginTop: "10px",
  fontWeight: "bold",
  backgroundColor: "orange",

  "&:hover": {
    backgroundColor: "#e4b55e",
  },
};

//
const LoginText = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
// state for form

const initialState = {
  username: "",
  email: "",
  password: "",
};

export default function register() {
  const [values, setValues] = useState(initialState);
  const {
    displayEmptyErr,
    displayPasswordMismatchErr,
    showAlert,
    setupUser,
    invalidUsernameErr,
  } = useAppContext();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const RegisterUser = (e) => {
    e.preventDefault();
    const { email, password, username } = values;
    if (!email || !password || !username) {
      displayEmptyErr();
      return;
    }
    // if(username === "admin"){
    //   invalidUsernameErr();
    //   return;
    // }

    const userDetails = { email, password, username };
    setupUser({ userDetails, alertText: "Registration successful" });
  };
  return (
    <>
    <Box sx={RegisterBox}>
      {showAlert && <Alert />}
      <Box sx={formDesign}>
        <form>
          <Typography variant="h4">Register</Typography>

          {/* username */}
          <Box>
            <TextField
              sx={formText}
              margin="normal"
              required
              variant="standard"
              fullWidth
              id="username"
              label="Username"
              name="username"
              value={values.username}
              autoComplete="Username"
              // autoFocus
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
          </Box>

          {/* email */}
          <Box>
            <TextField
              sx={formText}
              margin="normal"
              required
              variant="standard"
              fullWidth
              id="email"
              label="Email "
              name="email"
              value={values.email}
              autoComplete="email"
              onChange={handleChange}
              // autoFocus
              InputLabelProps={{
                style: { color: "black" },
              }}
              InputProps={{
                style: {
                  color: "black",
                },
              }}
            />
          </Box>

          {/* password */}
          <Box>
            <TextField
              sx={formText}
              margin="normal"
              required
              variant="standard"
              fullWidth
              id="password"
              label="Password "
              name="password"
              value={values.password}
              autoComplete="password"
              // autoFocus
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
          </Box>
          {/*confirm password */}
          <Box>
            <Button variant="contained" sx={loginbutton} onClick={RegisterUser}>
              Submit
            </Button>
          </Box>
        </form>

        <Box sx={{a:{
          color:"#fdebc8" ,fontWeight:"bold"}}}>
          <p>
            Have an account ? <Link href="/login">login</Link>
          </p>
        </Box>
      </Box>
    </Box>
    <Subfooter/>
    </>
  );
}
