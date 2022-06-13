import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";
import { baseurl } from "../../vars";
export const getUsersAsync = createAsyncThunk(
  "user/getUsersAsync",
  async (state) => {
    const finalurl = `${baseurl}/getuserdata/${state.username}`; //+ urladdon;
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
    // const urladdon = "user/unfollow"; // + state.username;
    const finalurl = `${baseurl}/user/unfollow`;
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
    const finalurl = `${baseurl}/user/follow`; // + urladdon;
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
  userpostloader: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [getUsersAsync.pending]: (state, action) => {
      state.userpostloader = true;
    },
    [getUsersAsync.fulfilled]: (state, action) => {
      state.userpostloader = false;
      state.followers = action.payload.followers;
      state.useridofpage = action.payload.userid;
      state.posts = action.payload.posts;
      state.nameval = action.payload.name;
    },
    [getUsersAsync.rejected]: (state, action) => {
      state.userpostloader = false;
    },
    [postUserfollow.fulfilled]: (state, action) => {
      const newstate = current(state);
      const finalfoll = [...newstate.followers, action.payload.idtobeadded];
      state.followers = finalfoll;
    },
    [postUserfollow.rejected]: (state, action) => {
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
      const finalfoll = [...newstate.followers].filter(
        (state) => state !== action.payload.idtoberemoved
      );
      state.followers = finalfoll;
    },
    [postUserunfollow.rejected]: (state, action) => {},
  },
});

// export const {} = userSlice.actions;
export default userSlice.reducer;
