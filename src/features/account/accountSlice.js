import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { baseurl } from "../../vars";

export const setLoginAsync = createAsyncThunk(
  "account/setLoginAsync",
  async (state, { rejectWithValue }) => {
    try {
      const requrl = `${baseurl}/account/login`;
      const response = await axios.post(requrl, {
        username: state.username,
        password: state.password,
      });
      return {
        token: response.data.token,
        userid: response.data.userid,
        username: response.data.username,
      };
    } catch (error) {
      if (
        error.response.status === 400 &&
        error.response.data.message === "user doesn't exist"
      ) {
        return rejectWithValue(error.response.data.message);
      }
      if (
        error.response.status === 400 &&
        error.response.data.errormessage === "passwords don't match"
      ) {
        return rejectWithValue(error.response.data.errormessage);
      }
      return rejectWithValue("some error occured");
    }
  }
);
export const setSignupAsync = createAsyncThunk(
  "account/setSignupAsync",
  async (state, { rejectWithValue }) => {
    try {
      const requrl = `${baseurl}/account/signup`;
      const response = await axios.post(requrl, {
        name: state.name,
        username: state.username,
        password: state.password,
      });
      const responsemessage = response.data.message;
      return { success: true, response: responsemessage };
    } catch (error) {
      if (
        error.response.data.message === "user already taken" &&
        error.response.status === 400
      ) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("some error occured");
    }
  }
);
const accountSlice = createSlice({
  name: "account",
  initialState: {
    value: 0,
    loginloader: false,
    registrationloader: false,
    token: localStorage.getItem("token") || "null",
    loginstatus: localStorage.getItem("loginstatus") || false,
    userid: localStorage.getItem("myuserid") || "",
    username: localStorage.getItem("username") || "",
  },
  reducers: {
    setLoginfalse: (state, action) => {
      state.loginstatus = false;
      state.token = "null";
      state.username = "";
      state.userid = "";
    },
  },
  extraReducers: {
    [setLoginAsync.pending]: (state, action) => {
      console.log("sending login request...");
      state.loginloader = true;
    },
    [setLoginAsync.rejected]: (state, action) => {
      state.loginloader = false;
      toast.error(action.payload, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
    [setLoginAsync.fulfilled]: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("myuserid", action.payload.userid);
      localStorage.setItem("username", action.payload.username);
      localStorage.setItem("loginstatus", true);
      state.loginstatus = true;
      state.loginloader = false;
      state.token = action.payload.token;
      state.userid = action.payload.userid;
      state.username = action.payload.username;
      toast.success("login successful", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
    [setSignupAsync.pending]: (state, action) => {
      state.registrationloader = true;
    },
    [setSignupAsync.fulfilled]: (state, action) => {
      state.registrationloader = false;
      toast.success(action.payload.response, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
    [setSignupAsync.rejected]: (state, action) => {
      // console.log({ actionpayload: action.payload, actiontype: action.type });
      state.registrationloader = false;
      toast.error(action.payload, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
  },
});
// Action creators are generated for each case reducer function
export const { setLogintrue, setLoginfalse } = accountSlice.actions;
export default accountSlice.reducer;
