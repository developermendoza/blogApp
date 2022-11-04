import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auth: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authenticateUser: (state, action) => {
      localStorage.setItem("userAuth", action.payload);
      state.auth = action.payload;
    },
    logoutUser: (state) => {
      localStorage.removeItem("userAuth");
      state.auth = "";
    },
  },
});

export const { authenticateUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
