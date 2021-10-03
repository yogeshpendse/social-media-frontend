import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { baseurl } from "../../vars";
export const setLoginAsync = createAsyncThunk(
  "account/setLoginAsync",
  async (state, { rejectWithValue }) => {
    try {
      const requrl = baseurl + "account/login";
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
      const requrl = baseurl + "account/signup";
      const response = await axios.post(requrl, {
        name: state.name,
        username: state.username,
        password: state.password,
      });

      return { success: true, response };
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

const initialState = {
  token: localStorage.getItem("token") || "null",
  loginstatus: false,
  userid: localStorage.getItem("myuserid") || "",
  username: localStorage.getItem("username") || "",
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    falsifyloginstatus: (state) => {
      state.loginstatus = false;
    },
  },
  extraReducers: {
    [setLoginAsync.pending]: (state, action) => {
      // console.log("sending login request...");
    },
    [setLoginAsync.rejected]: (state, action) => {
      // console.log("login request rejected...");
      // console.log({
      //   message: "setLoginAsync.rejected",
      //   error: action.payload,
      //   type: action.type,
      // });
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
      // console.log("login completed...");
      // console.log({
      //   actionpayload: action.payload.token,
      //   extred: "setLoginAsync.fulfilled",
      // });
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("myuserid", action.payload.userid);
      localStorage.setItem("username", action.payload.username);
      state.loginstatus = true;
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
    [setSignupAsync.fulfilled]: (state, action) => {
      // console.log({
      //   actionpayload: action.payload.response.data.message,
      //   actiontype: action.type,
      // });
      toast.success(action.payload.response.data.message, {
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

export const { falsifyloginstatus } = accountSlice.actions;
export default accountSlice.reducer;
