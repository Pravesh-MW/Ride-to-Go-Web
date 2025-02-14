import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeTab: "about",
  about: "",
  status: "",
  walletBalance: 0,
  settings: {},
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setAbout: (state, action) => {
      state.about = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setWalletBalance: (state, action) => {
      state.walletBalance = action.payload;
    },
    setSettings: (state, action) => {
      state.settings = action.payload;
    },
  },
});

// Export actions
export const { setActiveTab, setAbout, setStatus, setWalletBalance, setSettings } =
  profileSlice.actions;

// Export reducer
export default profileSlice.reducer;
