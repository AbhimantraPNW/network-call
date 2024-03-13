import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../redux/slices/userSlices";

export default configureStore({
  reducer: {
    users: usersReducer,
  },
});
