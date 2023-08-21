import React from "react"
import {AppProvider} from "../context/AppContext"
import Navbar from "../components/Navbar"
import '../styles/global.css'
import Footer from "@/components/Footer"
function MyApp({ Component, pageProps }) {
  
  return(
    <>
    <AppProvider>
      <Navbar/>    
      <Component {...pageProps} />
      <Footer/>
    </AppProvider>
    </>
  )
}

export default MyApp