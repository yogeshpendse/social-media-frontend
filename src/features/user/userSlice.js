import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";
import { baseurl } from "../../vars";
export const getUsersAsync = createAsyncThunk(
  "user/getUsersAsync",
  async (state) => {
    const urladdon = "getuserdata/" + state.username;
    const finalurl = baseurl + urladdon;
    const response = await axios.get(finalurl);
    if (response.data.success === true) {
      return {
        success: true,
        followers: response.data.userdata.followers,
        following: response.data.userdata.following,
        userid: response.data.userdata.userid,
        posts: response.data.posts,
        name: response.data.userdata.name,
      };
    }
    return { success: false };
  }
);
export const postUserunfollow = createAsyncThunk(
  "user/postUserunfollow",
  async (state) => {
    // console.log({ oool: state.token });
    const urladdon = "user/unfollow"; // + state.username;
    const finalurl = baseurl + urladdon;
    const response = await axios.post(
      finalurl,
      {
        userid: state.userid,
      },
      {
        headers: { authorization: state.token },
      }
    );
    if (response.data.success === true) {
      return {
        success: true,
        idtoberemoved: state.myuserid,
      };
    }
    return { success: false };
  }
);

export const postUserfollow = createAsyncThunk(
  "user/postUserfollow",
  async (state) => {
    // console.log({ kkkl: state.token });
    const urladdon = "user/follow"; // + state.username;
    const finalurl = baseurl + urladdon;
    const response = await axios.post(
      finalurl,
      {
        userid: state.userid,
      },
      {
        headers: { authorization: state.token },
      }
    );
    if (response.data.success === true) {
      return {
        success: true,
        idtobeadded: state.myuserid,
      };
    }
    return { success: false };
  }
);

const initialState = {
  loader: false,
  username: "",
  followers: [],
  following: [],
  useridofpage: "",
  posts: [],
  nameval: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [getUsersAsync.pending]: (state, action) => {
      // console.log({
      //   status: "pending...",
      //   payload: action.payload,
      //   location: "userSlice.js",
      // });
    },
    [getUsersAsync.fulfilled]: (state, action) => {
      // console.log({
      //   status: "fulfilled...",
      //   payload: action.payload,
      //   type: action.type,
      //   location: "userSlice.js",
      // });
      state.followers = action.payload.followers;
      state.useridofpage = action.payload.userid;
      state.posts = action.payload.posts;
      state.nameval = action.payload.name;
    },
    [getUsersAsync.rejected]: (state, action) => {
      // console.log({
      //   status: "rejected...",
      //   payload: action.payload,
      //   location: "userSlice.js",
      // });
    },
    [postUserfollow.fulfilled]: (state, action) => {
      const newstate = current(state);
      // console.log({
      //   status: "fulfilled...",
      //   payload: action.payload,
      //   type: action.type,
      //   location: "userSlice.js",
      //   idtobeadded: action.payload.idtobeadded,
      // });

      const finalfoll = [...newstate.followers, action.payload.idtobeadded];
      state.followers = finalfoll;
    },
    [postUserfollow.rejected]: (state, action) => {
      // console.log({
      //   status: "rejected...",
      //   payload: action.payload,
      //   type: action.type,
      //   location: "userSlice.js",
      // });
      toast.error("some error occurred", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
    [postUserunfollow.fulfilled]: (state, action) => {
      const newstate = current(state);
      // console.log({
      //   status: "fulfilled...",
      //   payload: action.payload,
      //   type: action.type,
      //   location: "userSlice.js",
      //   followers: newstate.followers,
      // });
      const finalfoll = [...newstate.followers].filter(
        (state) => state !== action.payload.idtoberemoved
      );
      state.followers = finalfoll;
      // console.log(action.payload);
      // console.log({ newfollowers: finalfoll });
    },
    [postUserunfollow.rejected]: (state, action) => {
      // console.log({
      //   status: "fulfilled...",
      //   payload: action.payload,
      //   type: action.type,
      //   location: "userSlice.js",
      // });
    },
  },
});

// export const {} = userSlice.actions;
export default userSlice.reducer;
