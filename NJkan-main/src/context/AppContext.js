import React, {
  useContext,
  createContext,
  useState,
  useReducer,
  useEffect,
} from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { AppReducer } from "./AppReducer";
import {
  EMPTY_ERR,
  PASSWORD_ERR,
  CLEAR_TEXT,
  SETUP_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
  VERIFIED_SUCCESS,
  VERIFIED_ERROR,
  PASSWORD_RECOVERY_ERROR,
  USER_EMAIL_FOUND,
  CHECKTOKEN_ERROR,
  INVALID_TOKEN,
  PASSWORD_MISMATCH,
  PASSWORD_CHANGED_SUCCESS,
  UPLOAD_MEME_ERROR,
  UPLOAD_MEME_SUCCESS,
  UPLOAD_VALIDATION,
  GETMYSONG_ERROR,
  SET_MY_SONGS,
  SET_SINGLE_SONG_ERROR,
  SET_SINGLE_SONG,
  CHANGE_PAGE,
  GET_ALL_SONGS,
  SEARCH_ERROR,
  GET_SEARCHED_SONG,
  SONG_DELETED,
  SONG_EDIT_SUCCESS,
  INVALID_USER_ERR,
  ADMIN_LOGIN_SUCCESS,
  SET_RELOADED,
  LOAD_PAGE,
  GET_ALL_VERIFIED_SONGS,
  SONG_APPROVED,
  GET_ADMIN_DASHBOARD_INFO,
  GET_TRENDING_SONGS,
  GET_RANDOM_SONGS,
  SET_LOADER,
  UNSET_USERNAME,
  SET_INITIALSTATE,
} from "./actions";

//https://kanmusic.onrender.com
// const token = localStorage.getItem("token");
// const verified = localStorage.getItem("verified");

const initialState = {
  name: "",
  password: "",
  showAlert: false,
  alertText: "",
  alertType: "",
  isVerified: false,
  isUserToken: false,
  Genre: ["Afrobeat", "Amapiano", "Hiphop"],
  DefaultGenre: "Afrobeat",
  songDetails: [],
  AllSongs: [],
  TrendingSongs: [],
  singleSongDetails: [],
  RandomSongs: [],
  page: 1,
  totalSongs: 0,
  numOfPages: 1,
  isloading: true,
  isreloaded: false,
  isAdminLogon: false,
  PendingSongs: "",
  ApprovedSongs: "",
  totalDownloads: "",
  Filter: ["Trending", "Latest", "Oldest"],
};

export const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const router = useRouter();

  //set localstates

  const setLocalStorage = () => {
    dispatch({ type: SET_INITIALSTATE });
  };

  const isPageReloaded = () => {
    dispatch({ type: SET_RELOADED });
  };
  // add to local storage

  const addUserToLocalStorage = (
    username,
    token,
    email,
    verified,
    isUserLoggedIn
  ) => {
    localStorage.setItem("username", username);
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
    localStorage.setItem("verified", verified);
    localStorage.setItem("isUserLoggedIn", isUserLoggedIn);
  };
  // logout User
  const logUserOff = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("username");
    localStorage.removeItem("isUserLoggedIn");

    dispatch({ type: UNSET_USERNAME });
  };

  // clear text
  const clearText = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_TEXT });
    }, 4000);
  };
  //Error for empty values
  const displayEmptyErr = () => {
    dispatch({ type: EMPTY_ERR });
    clearText();
  };
  //Invalid user error
  const invalidUsernameErr = () => {
    dispatch({ type: INVALID_USER_ERR });
    clearText();
  };
  const displayPasswordMismatchErr = () => {
    dispatch({ type: PASSWORD_ERR });
    clearText();
  };

  const setupUser = async ({ userDetails, alertText }) => {
    try {
      const { data } = await axios.post(
        `https://kanmusic.onrender.com/api/v1/auth/register`,
        userDetails
      );
      const { email, username } = data;
      dispatch({ type: SETUP_USER_SUCCESS, payload: { email } });
      router.push("/login");
    } catch (error) {
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearText();
  };

  //login user
  const loginUser = async ({ userDetails, alertText }) => {
    try {
      const { data } = await axios.post(
        `https://kanmusic.onrender.com/api/v1/auth/login`,
        userDetails
      );
      const { username, email, verified, token } = data;
      const isUserLoggedIn = true;
      addUserToLocalStorage(username, token, email, verified, isUserLoggedIn);
      dispatch({ type: LOGIN_USER_SUCCESS, payload: { username } });
      router.push("/user/dashboard");
    } catch (error) {
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearText();
  };

  //login admin

  const loginAdmin = async ({ userDetails, alertText }) => {
    try {
      const { data } = await axios.post(
        `/api/v1/adminauth/adminLogin`,
        userDetails
      );
      const { username, token } = data;
      dispatch({ type: ADMIN_LOGIN_SUCCESS });
      localStorage.setItem("username", username);
      localStorage.setItem("token", token);
    } catch (error) {
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearText();
  };

  const verifyUser = async (token) => {
    try {
      const { data } = await axios.get(`/api/v1/auth/verify?token=${token}`);
      const { userId } = data;
      if (!userId) {
        dispatch({ type: VERIFIED_ERROR });
      }
      dispatch({ type: VERIFIED_SUCCESS });
    } catch (error) {}
    clearText();
  };

  const RestorePassword = async (email, alertText) => {
    try {
      const { data } = await axios.post(
        `https://kanmusic.onrender.com/api/v1/auth/forgotpassword`,
        email
      );
      dispatch({ type: USER_EMAIL_FOUND });
    } catch (error) {
      dispatch({
        type: PASSWORD_RECOVERY_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearText();
  };

  const ChangePassword = async ({ userDetails }) => {
    try {
      const { data } = await axios.post(
        `/api/v1/auth/changepassword`,
        userDetails
      );
      const { userId } = data;
      if (userId) {
        dispatch({ type: PASSWORD_CHANGED_SUCCESS });
      }
    } catch (error) {}
    clearText();
  };

  const checkUserToken = async (token) => {
    try {
      const { data } = await axios.post(
        `/api/v1/auth/checkusertoken?token=${token}`
      );
      const { userId } = data;
      if (!userId) {
        dispatch({ type: INVALID_TOKEN });
      }
    } catch (error) {
      dispatch({
        type: CHECKTOKEN_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };

  const uploadErrorHandler = async () => {
    dispatch({ type: UPLOAD_VALIDATION });
    clearText();
  };

  // uploadMemeVideo

  const uploadVideo = async ({ formData }) => {

    try {
      const { data } = await axios.post(
        `http://localhost:6060/api/v1/upload/uploadmeme`,
        formData,
        {
          "Content-Type": "multipart/form-data",
        }
      );

      const success = { data };
      if (success) {
        dispatch({ type: UPLOAD_MEME_SUCCESS});
      }
    } 
    catch (error) {
      dispatch({
        type: UPLOAD_MEME_ERROR,
        payload: { error: error.response.data.msg },
      });
    }

    // clearText();
  };

  //Get songs context

  const getSongs = async ({ userDetails }) => {
    try {
      const page = state.page;

      const { data } = await axios.post(
        `/api/v1/upload/songInfo?page=${page}`,
        userDetails
      );
      console.log(data);
      const { mySongs, numOfPages, totalSongs } = data;
      dispatch({
        type: SET_MY_SONGS,
        payload: {
          mySongs: mySongs,
          numOfPages: numOfPages,
          totalSongs: totalSongs,
        },
      });
    } catch (error) {
      dispatch({ type: GETMYSONG_ERROR });
    }
  };

  //Get all songs for admin approvals

  const getSongsForAdmin = async ({ userDetails }) => {
    try {
      const page = state.page;

      const { data } = await axios.post(
        `/api/v1/upload/getsongsforadmin?page=${page}`,
        userDetails
      );
      console.log(data);
      const { mySongs, numOfPages, totalSongs } = data;
      dispatch({
        type: SET_MY_SONGS,
        payload: {
          mySongs: mySongs,
          numOfPages: numOfPages,
          totalSongs: totalSongs,
        },
      });
    } catch (error) {
      dispatch({ type: GETMYSONG_ERROR });
    }
  };

  // get Single Song

  const getAllSingleSong = async (songId) => {
    try {
      const { data } = await axios.post(
        `https://kanmusic.onrender.com/api/v1/upload/singleMusicInfo`,
        {
          id: songId,
        }
      );
      dispatch({ type: LOAD_PAGE });
      return data.data;
    } catch (error) {
      dispatch({ type: SET_SINGLE_SONG_ERROR });
    }
  };

  // CHANGE PAGE
  const changePage = (page) => {
    console.log(page);
    dispatch({ type: CHANGE_PAGE, payload: { page } });
  };
  const Spinner = () => {
    dispatch({ type: SET_LOADER });
  };

  // GET ALL SONGS
  const getAllSongs = async () => {
    Spinner();
    try {
      const page = state.page;

      const { data } = await axios.get(
        `https://kanmusic.onrender.com/api/v1/upload/getallsongs?page=${page}`
      );
      const { allSongs, numOfPages, totalSongs } = data;
      dispatch({
        type: GET_ALL_SONGS,
        payload: {
          allSongs: allSongs,
          numOfPages: numOfPages,
          totalSongs: totalSongs,
        },
      });
    } catch (error) {}
  };

  // GET ALL UNVERIFIED SONGS FOR ADMIN
  const getUnverifiedAllSongs = async () => {
    try {
      const page = state.page;
      const { data } = await axios.get(
        `/api/v1/upload/getallunverifiedsongs?page=${page}`
      );
      const {
        allSongs,
        numOfPages,
        totalSongs,
        CountofApprovedSongs,
        CountofPendingSongs,
      } = data;
      dispatch({
        type: GET_ALL_VERIFIED_SONGS,
        payload: {
          allSongs: allSongs,
          numOfPages: numOfPages,
          totalSongs: totalSongs,
          CountofApprovedSongs: CountofApprovedSongs,
          CountofPendingSongs: CountofPendingSongs,
        },
      });
    } catch (error) {}
  };

  // search for song

  const searchSong = async (search) => {
    try {
      const { data } = await axios.get(
        `https://kanmusic.onrender.com/api/v1/upload/searchSong?song=${search}`
      );
      const { numOfPages, SearchedSong, totalSongs } = data;
      dispatch({
        type: GET_SEARCHED_SONG,
        payload: {
          SearchedSong: SearchedSong,
          numOfPages: numOfPages,
          totalSongs: totalSongs,
        },
      });
    } catch (e) {}
  };

  // search engine for admin

  const searchSongForAdmin = async (search) => {
    try {
      const { data } = await axios.get(
        `/api/v1/upload/searchSongForAdmin?song=${search}`
      );
      const { numOfPages, SearchedSong, totalSongs } = data;
      dispatch({
        type: GET_SEARCHED_SONG,
        payload: {
          SearchedSong: SearchedSong,
          numOfPages: numOfPages,
          totalSongs: totalSongs,
        },
      });
    } catch (e) {}
  };

  //delete song
  const deleteThisSong = async (id) => {
    try {
      const { data } = await axios.get(
        `/api/v1/upload/deleteSong?songid=${id}`
      );
      dispatch({ type: SONG_DELETED });
    } catch (e) {}
    clearText();
  };

  //Approve song
  const approveThisSong = async (id) => {
    try {
      const { data } = await axios.post(
        `/api/v1/upload/approveSong?songid=${id}`
      );
      dispatch({ type: SONG_APPROVED });
      isPageReloaded();
    } catch (error) {}
    clearText();
  };

  //edit Song

  const editSong = async (title, Genre, artist, description, id) => {
    try {
      const songInfo = { title, Genre, artist, description, id };

      const { data } = await axios.post("/api/v1/upload/editSong", {
        details: songInfo,
      });
      console.log("we doing");
      dispatch({ type: SONG_EDIT_SUCCESS });
    } catch (e) {}
  };

  //download counter
  const downloadCounter = async (id) => {
    try {
      const { data } = await axios.post(
        `/api/v1/upload/downloadcounter?id=${id}`,
        userDetails
      );
    } catch (error) {

    }
  };

  // get admin dashboard

  const getAdminDashboard = async () => {
    try {
      const { data } = await axios.get(`/api/v1/upload/getAdminDashboard`);
      const { totalDownloads, CountofApprovedSongs, CountofPendingSongs } =
        data;
      dispatch({
        type: GET_ADMIN_DASHBOARD_INFO,
        payload: {
          totalDownloads: totalDownloads,
          CountofApprovedSongs: CountofApprovedSongs,
          CountofPendingSongs: CountofPendingSongs,
        },
      });
    } catch (error) {}
  };

  // get trending songs
  const getAllTrendingSongs = async () => {
    try {
      const { data } = await axios.get(
        `https://kanmusic.onrender.com/api/v1/upload/getTrendingSongs`
      );
      const { TrendingSongs } = data;
      dispatch({
        type: GET_TRENDING_SONGS,
        payload: {
          TrendingSongs: TrendingSongs,
        },
      });
    } catch (error) {}
  };
  //getAllRandomSongs

  const getAllRandomSongs = async () => {
    try {
      const { data } = await axios.get(`/api/v1/upload/getRandomSongs`);
      const { RandomSongs } = data;
      dispatch({
        type: GET_RANDOM_SONGS,
        payload: {
          RandomSongs: RandomSongs,
        },
      });
    } catch (error) {}
  };

  //get sign url

  const getMusicLinks = async (filename, songid) => {
    try {
      const userDetails = { filename, songid };
      console.log(userDetails)
      const data = await axios.post(
        `http://localhost:6000/api/v1/upload/getSignUrl`,userDetails
      );
    } catch (error) {}
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayEmptyErr,
        displayPasswordMismatchErr,
        setupUser,
        loginUser,
        verifyUser,
        RestorePassword,
        ChangePassword,
        checkUserToken,
        uploadVideo,
        uploadErrorHandler,
        getSongs,
        getAllSingleSong,
        changePage,
        getAllSongs,
        searchSong,
        deleteThisSong,
        editSong,
        invalidUsernameErr,
        loginAdmin,
        logUserOff,
        approveThisSong,
        getUnverifiedAllSongs,
        isPageReloaded,
        getSongsForAdmin,
        downloadCounter,
        getAdminDashboard,
        getAllTrendingSongs,
        getAllRandomSongs,
        setLocalStorage,
        getMusicLinks,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useAppContext() {
  return useContext(AppContext);
}
