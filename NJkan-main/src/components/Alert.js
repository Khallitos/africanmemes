import React from "react"
import { useAppContext } from "../context/AppContext"
import { Box, Typography, TextField, Button, Divider } from "@mui/material/";

const success = {
  color:"green",
  backgroundColor:"white"
  
}

const danger = {
  color:"red",
  
}

export default function Alert() {
    const {alertType,alertText} = useAppContext();
   
   
  return (
    <Box sx ={alertType === "success" ? success : danger}> {alertText}</Box>
  )
}



