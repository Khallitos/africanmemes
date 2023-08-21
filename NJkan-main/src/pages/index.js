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
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { FilterBox,FormRowSelect } from "@/components";


const linkStyle = {
  textDecoration: "none",
  backgroundColor: "#3c3939",
};

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
  justifyContent:"center"
};

const sidebar = {
  marginTop: "300px",
  backgroundColor: "#332E2E",
  padding: "10px",
  marginLeft: {
    xl: "100px",
    lg: "50px",
    md: "100px",
  },
  // display:{
  //   sm:"none",
  //   xs:"none",
  // }
  "@media (max-width: 900px)": {
    display: "none",
  },
  "@media (max-width: 1000px)": {
    display: "none",
  },
  width: "300px",
};
const pageDesign = {
  marginTop: "60px",
  marginX: {
    lg: "auto",
    md: "auto",
    xl: 40,
    sm: 2,
  },
  width: {
    xl: "600px",
    xs: "640px",
  },
  bottom: "0",
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
  marginTop:"20px"
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

  const getSongs = () => {
    getAllSongs();
  };

  const handleKeypress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      Search();
    }
  };

  const getRandomSongs = () => {
    getAllRandomSongs();
  };
  const getTrendingSongs = () => {
    getAllTrendingSongs();
  };

  useEffect(() => {
    getSongs();
  }, [page]);

  useEffect(() => {
    getTrendingSongs();
    getRandomSongs();
  }, []);

  useEffect(() => {
    if (search.length < 1) {
      getSongs();
    }
  }, [search.length]);

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
      <Box sx={{ display: "flex" }}>
        
        <Box sx={pageDesign}>
          {/* <Typography variant="h6" color="initial" sx={DsgsearchText}>
          {" "}
          Find a song..
        </Typography> */}
        
      
        

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
        <Box sx={{display:"flex" , marginBottom:"20px" , justifyContent:"center !important" , backgroundColor:"#332e2e",borderRadius:"5px", height:"60px", padding:"20px"}}>
          <FormRowSelect
            labelText="Category"
            sx={{ width: "40px", backgroundColor:"white", marginLeft:"20px" }}
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
          <Box>
            {!totalSongs && (
              <Typography
                variant="h5"
                color="initial"
                sx={{ marginBottom: "20px" }}
              >
                No results found
              </Typography>
            )}

            {AllSongs.map((song) => (
              <Link
                href={"/download/" + song._id}
                style={linkStyle}
                key={song._id}
              >
                <Cards
                  key={song._id}
                  title={song.title}
                  artist={song.artist}
                  Genre={song.Genre}
                  description={song.description}
                  ImageKey={song.Key}
                />
              </Link>
            ))}
          </Box>

          <PageBtn />

          {/* Random songs */}
          {isSuggestions && (
            <Box sx={{ marginTop: "100px" }}>
              <Typography
                variant="h5"
                color="initial"
                sx={{ marginBottom: "10px" }}
              >
                YOU MAY ALSO LIKE <Divider light />
              </Typography>

              <Box sx={{ marginBottom: "10px" }}>
                {RandomSongs.map((song) => (
                  <Link href={"/download/" + song._id} style={linkStyle}>
                    <div>
                      <TrendCards
                        key={song._id}
                        title={song.title}
                        artist={song.artist}
                        Genre={song.Genre}
                        description={song.description}
                        ImageKey={song.Key}
                      />
                    </div>
                  </Link>
                ))}
              </Box>
            </Box>
          )}
        </Box>
        {/* <Box sx={sidebar}>
          <Typography
            variant="h5"
            color="white"
            sx={{ marginBottom: "20px", marginTop: "20px", fontWeight: "bold" }}
          >
            TRENDING SONGS
          </Typography>
          <Box>
            {TrendingSongs.map((song) => (
              <Link href={"/download/" + song._id} style={linkStyle}>
                <Box>
                  <TrendCards
                    key={song._id}
                    title={song.title}
                    artist={song.artist}
                    Genre={song.Genre}
                    description={song.description}
                    ImageKey={song.Key}
                  />
                </Box>
              </Link>
            ))}
          </Box>
        </Box> */}
      </Box>
      <Subfooter />
    </>
  );
}
