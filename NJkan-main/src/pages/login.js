import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, Divider } from "@mui/material/";
import { PersonIcon, LockIcon, AccountCircleIcon } from "@mui/icons-material/";
import { useAppContext } from "../context/AppContext";
import { Alert, Subfooter } from "../components";
import bg from "../../public/images/bg.jpg";
import Link from "next/link";
import { useRouter } from "next/router";
import CircularProgress from "@mui/material/CircularProgress";

// import {Link} from "react-router-dom"
// import { useNavigate } from "react-router-dom";

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
    xs: "auto",
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

//
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
  email: "",
  password: "",
};

export default function login() {
  //   const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
  const [istoken, setIstoken] = useState(true);
  const { displayEmptyErr, showAlert, loginUser, isloading } = useAppContext();
  const router = useRouter();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const logUser = (e) => {
    e.preventDefault();
    const { email, password } = values;
    if (!email) {
      displayEmptyErr();
      return;
    }

    const userDetails = { email, password };
    loginUser({ userDetails, alertText: "login successful" });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      router.push("/user/dashboard");
    } else {
      setIstoken(false);
      console.log(istoken);
    }
  });

  if (istoken)
    return (
      <CircularProgress
        sx={{
          position: "fixed",
          top: "50%",
          left: "50%",
          color: "orange",
          transform: "translate(-50%, -50%)",
        }}
      />
    );

  return (
    <>
      <Box sx={RegisterBox}>
        <Box sx={formDesign}>
          <form>
            <Typography variant="h4" sx={LoginText}>
              Login
            </Typography>
            {showAlert && <Alert />}

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
                color="warning"
                fullWidth
                id="password"
                label="Password"
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
            <Box>
              <Button variant="contained" onClick={logUser} sx={loginbutton}>
                Login
              </Button>
            </Box>
          </form>
          <Box
            sx={{
              marginBottom: "5px",
              a: {
                color: "#fdebc8",
                fontWeight: "bold",
              },
            }}
          >
            <p>
              Need an account ?{" "}
              <Link
                href="/register"
                sx={{ textDecoration: "none", color: "#fdebc8" }}
              >
                Sign Up
              </Link>
            </p>
          </Box>
          <Divider orientation="horizontal" />
          <Divider orientation="horizontal" />
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              a: {
                color: "#fdebc8",
                fontWeight: "bold",
              },
            }}
          >
            {" "}
            <Link href="/forgotpassword">Forgot password</Link>
          </Box>
        </Box>
      </Box>
      <Subfooter />
    </>
  );
}
