import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import Cards from "../components/Cards";
import PageBtn from "../components/PageBtn";
import Box from "@mui/material/Box";
import { margin } from "@mui/system";
import Typography from "@mui/material/Typography";
import TrendCards from "../components/TrendCards";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "next/link";
import { useRouter } from "next/router";
import Subfooter from "@/components/Subfooter";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { FilterBox, FormRowSelect } from "@/components";

const DefaultGenre = "Afrobeats";
const initialState = {
  title: "",
  Genre: "",
  description: "",
  artist: "",
  song: "",
};
const searchDesign = {
  ml: 1,
  flex: 1,
  width: {
    xs: "70px",
  },
  justifyContent: "center",
};

const pageDesign = {
  marginTop: "30px",
  marginX: {
    lg: "100px",
    md: "10px",
    xl: "10px",
    sm: "10px",
  },
ml:1,
padding:"20px",

};
const Dsgsearch = {
  p: "2px 4px",
  display: "flex",
  alignItems: "center",
  width: {
    xs: "80%",
  },
  marginBottom: "20px",
  marginX: {
    lg: "auto",
    sm: "",
    // xl: "45%",
    md: "auto",
    xs: "auto",
  },
  marginTop: "20px",
};

const DsgsearchText = {
  p: "2px 4px",
  display: "flex",
  alignItems: "center",
  width: 400,
  marginRight: {
    lg: "40%",
    sm: "",
    xl: "45%",
    md: "30%",
  },
};

export default function home() {
  const {
    getAllSongs,
    AllSongs,
    page,
    searchSong,
    isloading,
    TrendingSongs,
    getAllTrendingSongs,
    getAllRandomSongs,
    RandomSongs,
    totalSongs,
    Genre,
    Filter,
    DefaultGenre,
    getAllMemes,
    allMemes,
  } = useAppContext();

  const [search, setSearch] = useState("");
  const [values, setValues] = useState(initialState);
  const [isSuggestions, setIsSuggestions] = useState(false);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const Search = (e) => {
    searchSong(search);
    setIsSuggestions(true);
  };

  const getMemes = () => {
    getAllMemes();
  };
  const handleKeypress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      Search();
    }
  };
  const linkStyle = {
    textDecoration: "none",
    width: "100px",
  };

  useEffect(() => {
    getMemes();
  }, [page]);

  // useEffect(() => {
  //   if (search.length < 1) {
  //     getSongs();
  //   }
  // }, [search.length]);

  if (isloading)
    return (
      <CircularProgress
        sx={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
    );

  return (
    <>
      <Box>
        <Box sx={pageDesign}>
          {/* <Typography variant="h6" color="initial" sx={DsgsearchText}>
          {" "}
          Find a song..
        </Typography> */}
          <Box>
            <Paper component="form" sx={Dsgsearch}>
              <InputBase
                sx={searchDesign}
                placeholder="Search......"
                inputProps={{ "aria-label": "Search for a song" }}
                name="search"
                value={search}
                autoFocus
                // onKeyDown= {Search}
                onKeyPress={handleKeypress}
                onChange={(e) => setSearch(e.target.value)}
              />
              <IconButton
                type="button"
                sx={{ p: "10px" }}
                aria-label="search"
                onClick={Search}
              >
                <SearchIcon />
              </IconButton>
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            </Paper>
          </Box>
          <Box
            sx={{
              display: "flex",
              marginBottom: "20px",
              justifyContent: "center !important",
              backgroundColor: "#332e2e",
              borderRadius: "5px",
              height: "60px",
              padding: "20px",
            }}
          >
            <FormRowSelect
              labelText="Category"
              sx={{
                width: "40px",
                backgroundColor: "white",
                marginLeft: "20px",
              }}
              // id="outlined-required"
              name="Genre"
              value={values.Genre}
              handleChange={handleChange}
              list={Genre}
              defaultValue={"Afrobeats"}
            />

            <FilterBox
              labelText="Filter"
              sx={{ width: "40px" }}
              id="outlined-required"
              name="Filter"
              value={values.Filter}
              handleChange={handleChange}
              list={Filter}
              defaultValue={"Filter"}
            />
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, calc(20rem - 55px))",
              gridGap: "0rem",
              gridColumnGap: "20px",
              marginX:{
                xl:"80px",
                lg:"20px",
                md:"80px",
                sm:"50px",
                xs:"20px"
              },
             
            }}
          >
            {allMemes.map((meme) => (
              <Link
                href={"/download/" + meme._id}
                style={linkStyle}
                key={meme._id}
              >
                <Cards
                  key={meme._id}
                  title={meme.title}
                  Genre={meme.Genre}
                  VideoKey={meme.Key}
                />
              </Link>
            ))}
          </Box>

          <PageBtn />
        </Box>
      </Box>
      <Subfooter />
    </>
  );
}
