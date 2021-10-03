import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { baseurl } from "../../vars";
export const getPostsAsync = createAsyncThunk(
  "post/getPostsAsync",
  async () => {
    const getpostrl = baseurl + "getallposts";
    const response = await axios.get(getpostrl);
    if (response.data.success) {
      // console.log({ response });
      const data = response.data.kbd;
      return data;
    }
    return [];
  }
);
export const postPostAsync = createAsyncThunk(
  "post/postPostAsync",
  async (payload) => {
    const requrl = baseurl + "post/post";
    const response = await axios.post(
      requrl,
      {
        postid: payload.postid,
        content: payload.content,
      },
      {
        headers: { authorization: payload.tokenval },
      }
    );
    if (response.status === 200) {
      // console.log({ data: response.data, status: response.status });
      toast.success("posted successfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }
);

export const postLikesAsync = createAsyncThunk(
  "post/postLikesAsync",
  async (payload, { rejectWithValue }) => {
    try {
      const requrl = baseurl + "interaction/like";
      const response = await axios.post(
        requrl,
        {
          creator: payload.creator,
          postid: payload.postid,
        },
        {
          headers: { authorization: payload.tokenval },
        }
      );
      return { data: response.data.data };
    } catch (error) {
      if (
        error.response.status === 400 &&
        error.response.data.message === "You can't like your own post"
      ) {
        return rejectWithValue(error.response.data.message);
      }
      if (
        error.response.data.errormessage === "already liked" &&
        error.response.status === 400
      ) {
        return rejectWithValue("post is already liked");
      } else {
        return rejectWithValue("Oops!!! Something went wrong");
      }
    }
  }
);
const initialState = {
  token: localStorage.getItem("token") || "null",
  userposts: [],
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {},
  extraReducers: {
    [getPostsAsync.pending]: (state, action) => {
      // console.log("pending...");
    },
    [getPostsAsync.fulfilled]: (state, action) => {
      // console.log("fulfilled...");
      state.userposts = action.payload;
      // console.log(action.payload);
    },
    [getPostsAsync.rejected]: (state, action) => {
      // console.log({ message: "rejected...", location: "postSlice.js" });
    },
    [postLikesAsync.fulfilled]: (state, action) => {
      // console.log({ state: current(state), payload: action.payload });
      toast.success("You have post liked", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
    [postLikesAsync.rejected]: (state, action) => {
      // console.log({ message: action.payload, location: action.type });
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
    [postPostAsync.fulfilled]: (state) => {
      // console.log("post fulfilled");
    },
    [postPostAsync.pending]: (state) => {
      // console.log("post pending");
    },
    [postPostAsync.rejected]: (state) => {
      // console.log("post rejected");
      toast.error("Some error occured", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
    // [postLikesAsync.pending]: (state, action) => {},
  },
});

export const { increment, settokentols } = counterSlice.actions;
export default counterSlice.reducer;
