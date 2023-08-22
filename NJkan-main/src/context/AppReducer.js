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
  PASSWORD_MISMATCH,
  PASSWORD_CHANGED_SUCCESS,
  UPLOAD_MEME_ERROR,
  UPLOAD_MUSIC_SUCCESS,
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
  ADMIN_LOGIN_ERROR,
  SET_RELOADED,
  LOAD_PAGE,
  GET_ALL_VERIFIED_SONGS,
  SONG_APPROVED,
  GET_ADMIN_DASHBOARD_INFO,
  GET_TRENDING_SONGS,
  GET_RANDOM_SONGS,
  SET_LOADER,
  UNSET_USERNAME,
  IS_USER_LOGGED_IN,
  IS_USER_LOGGED_OUT,
  UPLOAD_MEME_SUCCESS,
  UPLOAD_MUSIC_ERROR,
  GET_ALL_MEMES,
  SET_INITIALSTATE } from "./actions";

  
  export const AppReducer = (state, action) => {

    if (action.type === SET_INITIALSTATE) {
      return {
        ...state,
       state: {
        email: localStorage.getItem("email") || null,
        token: localStorage.getItem("token") || false,
        username: localStorage.getItem("username") || null,
        isUserLoggedIn: localStorage.getItem("isUserLoggedIn")|| false,
      }
    }
  }

//Get all memes videos 

  if (action.type === GET_ALL_MEMES) {
    return {
      ...state, 
      allMemes: action.payload.allMemes,

  }
}
  
    if (action.type === UPLOAD_MEME_ERROR) {
      return {
        ...state,
        showAlert: true,
        alertText: action.payload.error,
      
      };
    }
  
    if (action.type === UPLOAD_MEME_SUCCESS) {
      return {
        ...state,
        showAlert: true,
        alertText: "Meme uploaded successfully",
      };
    }
  
    if (action.type === CLEAR_TEXT) {
      return {
        ...state,
        showAlert: false,
        alertText: "",
        alertType: "",
      };
    }
  
    if (action.type === SET_LOADER) {
      return {
        ...state,
        isloading:true
      };
    }
    if (action.type === SETUP_USER_SUCCESS) {
      return {
        ...state,
        showAlert: true,
        alertText: "Success",
        alertType: "",
        email: action.payload.email,
        token: action.payload.token,
      };
    }
  
    if (action.type === REGISTER_USER_ERROR) {
      return {
        ...state,
        showAlert: true,
        alertText: action.payload.msg,
        alertType: "danger",
      };
    }
  
    if (action.type === LOGIN_USER_ERROR) {
      return {
        ...state,
        showAlert: true,
        alertText: action.payload.msg,
        alertType: "danger",
      };
    }
  
    if (action.type === LOGIN_USER_SUCCESS) {
      return {
        ...state,
        showAlert: true,
        alertText: "Login successful",
        alertType: "success",
        username: action.payload.username,
      };
    }
    if (action.type === VERIFIED_SUCCESS) {
      return {
        ...state,
        isVerified: true,
      };
    }
  
    if (action.type === VERIFIED_ERROR) {
      return {
        ...state,
      };
    }
    if (action.type === PASSWORD_RECOVERY_ERROR) {
      return {
        ...state,
        showAlert: true,
        alertText: action.payload.msg,
        alertType: "danger",
      };
    }
  
    if (action.type === USER_EMAIL_FOUND) {
      return {
        ...state,
        showAlert: true,
        alertText:
          "Instructions on how to reset your password were sent to your mail .Please make sure to check your spam and trash if you can't find the email.",
        alertType: "success",
      };
    }
  
    if (action.type === CHECKTOKEN_ERROR) {
      return {
        ...state,
        isUserToken: true,
      };
    }
  
    if (action.type === PASSWORD_ERR) {
      return {
        ...state,
        showAlert: true,
        alertText: "Password do not match",
        alertType: "danger",
      };
    }
  
    if (action.type === PASSWORD_CHANGED_SUCCESS) {
      return {
        ...state,
        showAlert: true,
        alertText: "Password successfully changed",
        alertType: "success",
        isUserToken: true,
      };
    }
  
    if (action.type === UPLOAD_MUSIC_ERROR) {
      return {
        ...state,
        showAlert: true,
        alertText: action.payload.msg,
        alertType: "danger",
      };
    }
  
    if (action.type === UPLOAD_MUSIC_SUCCESS) {
      return {
        ...state,
        showAlert: true,
        alertText: "Song successfully upload and awaiting approval",
        alertType: "danger",
      };
    }
  
    if (action.type === UPLOAD_VALIDATION) {
      return {
        ...state,
        showAlert: true,
        alertText: "Please provide all details",
        alertType: "danger",
      };
    }
  
    if (action.type === GETMYSONG_ERROR) {
      return {
        ...state,
        showAlert: true,
        alertText: "Please contact your system administrator for assistance",
        alertType: "danger",
      };
    }
  
    if (action.type === SET_MY_SONGS) {
      return {
        ...state,
        songDetails: action.payload.mySongs,
        numOfPages: action.payload.numOfPages,
        totalSongs: action.payload.totalSongs,
        isloading: false,
      };
    }
    if (action.type === SET_SINGLE_SONG) {
      return {
        ...state,
        singleSongDetails: action.payload.data,
      };
    }
  
    if (action.type === SET_SINGLE_SONG_ERROR) {
      return {
        ...state,
        showAlert: true,
        alertText: "Please contact your system administrator for assistance",
        alertType: "danger",
      };
    }
  
    if (action.type === CHANGE_PAGE) {
      return {
        ...state,
        page: action.payload.page,
      };
    }
  
    if (action.type === GET_ALL_SONGS) {
      return {
        ...state,
        AllSongs: action.payload.allSongs,
        numOfPages: action.payload.numOfPages,
        totalSongs: action.payload.totalSongs,
        isloading: false,
      };
    }
  
    if (action.type === GET_ALL_VERIFIED_SONGS) {
      return {
        ...state,
        AllSongs: action.payload.allSongs,
        numOfPages: action.payload.numOfPages,
        totalSongs: action.payload.totalSongs,
        isloading: false,
        PendingSongs: action.payload.CountofPendingSongs,
        ApprovedSongs:action.payload.CountofApprovedSongs
      };
    }
  
    if (action.type === SEARCH_ERROR) {
      return {
        ...state,
        showAlert: true,
        alertText: "No songs found",
      };
    }
    if (action.type === GET_SEARCHED_SONG) {
      return {
        ...state,
        AllSongs: action.payload.SearchedSong,
        numOfPages: action.payload.numOfPages,
        totalSongs: action.payload.totalSongs,
      };
    }
  
    if (action.type === SONG_DELETED) {
      return {
        ...state,
        showAlert: true,
        alertText: "Please contact your system administrator for assistance",
        alertType: "danger",
      };
    }
  
    if (action.type === SONG_APPROVED) {
      return {
        ...state,
        showAlert: true,
        alertText: "Please contact your system administrator for assistance",
        alertType: "danger",
      };
    }
  
    if (action.type === SONG_EDIT_SUCCESS) {
      return {
        ...state,
        showAlert: true,
        alertText: "Song successfully updated",
        alertType: "success",
      };
    }
    if (action.type === ADMIN_LOGIN_SUCCESS) {
      return {
        ...state,
        isAdminLogon: true,
      };
    }
    if (action.type === SET_RELOADED) {
      return {
        ...state,
        isreloaded: true,
      };
    }
    if (action.type === LOAD_PAGE) {
      return {
        ...state,
        isloading: false,
      };
    }
  
    if (action.type === GET_ADMIN_DASHBOARD_INFO) {
      return {
        ...state,
        PendingSongs: action.payload.CountofPendingSongs,
        ApprovedSongs:action.payload.CountofApprovedSongs,
        totalDownloads:action.payload.totalDownloads
      };
    }
  
    if (action.type === GET_TRENDING_SONGS
      ) {
      return {
        ...state,
        TrendingSongs: action.payload.TrendingSongs,
      };
    }
  
    if (action.type === GET_RANDOM_SONGS
      ) {
      return {
        ...state,
        RandomSongs: action.payload.RandomSongs,
      };
    }
    
  
    if (action.type === UNSET_USERNAME
      ) {
      return {
        ...state,
        username: null,
      };
    }
    
    if (action.type === IS_USER_LOGGED_IN
      ) {
      return {
        ...state,
        isUserLoggedIn: true,
      };
    }
  
    if (action.type === IS_USER_LOGGED_OUT
      ) {
      return {
        ...state,
        isUserLoggedIn: false,
      };
    }
    
    throw new Error(`${action.type} does not exist`);
  }
  
  
  