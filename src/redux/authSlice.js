import { createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const initialState = {
  access_token: cookies.get("access_token") || "",
  refresh_token: cookies.get("refresh_token") || "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action) {
      const { access_token, refresh_token } = action.payload;
      state.access_token = access_token;
      state.refresh_token = refresh_token;
    },
    async logOut(state) {
      cookies.remove("access_token");
      cookies.remove("refresh_token");
      state.access_token = null;
      state.refresh_token = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
