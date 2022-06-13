import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "../features/account/accountSlice";
import postReducer from "../features/post/postSlice";
import userReducer from "../features/user/userSlice";
export const store = configureStore({
  reducer: {
    account: accountReducer,
    post: postReducer,
    user: userReducer,
  },
});
