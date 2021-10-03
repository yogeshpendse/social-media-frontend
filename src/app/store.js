import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../features/posts/postSlice";
import accountReducer from "../features/account/accountSlice";
import userReducer from "../features/user/userSlice";
export const store = configureStore({
  reducer: {
    post: postReducer,
    account: accountReducer,
    user: userReducer,
  },
});
