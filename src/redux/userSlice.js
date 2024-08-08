import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  name: "",
  username: "",
  email: "",
  phone: "",
  about: "",
  profile_pic: "",
  accessToken: "",
  refreshToken: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state._id = action.payload._id;
      state.name = action.payload.name;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.about = action.payload.about;
      state.profile_pic = action.payload.profile_pic;
    },
    setToken: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    logout: (state) => {
      state._id = "";
      state.name = "";
      state.username = "";
      state.email = "";
      state.phone = "";
      state.about = "";
      state.profile_pic = "";
      state.accessToken = "";
      state.refreshToken = "";
    },
  },
});

export const { setUser, setToken, logout } = userSlice.actions;

export default userSlice.reducer;
