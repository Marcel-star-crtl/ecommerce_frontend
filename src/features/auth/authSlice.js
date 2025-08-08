import { createSlice } from "@reduxjs/toolkit";

// Helper to safely parse user from localStorage
const parseUserFromStorage = () => {
  try {
    const userString = localStorage.getItem("user");
    return userString && userString !== "undefined" ? JSON.parse(userString) : null;
  } catch (e) {
    console.error("Failed to parse user from localStorage", e);
    return null;
  }
};

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
  token: localStorage.getItem("token"),
  refreshToken: localStorage.getItem("refreshToken"),
  user: parseUserFromStorage(),
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    login: (state, action) => {
      if (!action.payload?.token || !action.payload?.user) {
        console.error("Invalid login payload structure", action.payload);
        return;
      }
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.user = action.payload.user;
      state.loading = false;
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("token", action.payload.token);
      if (action.payload.refreshToken) {
        localStorage.setItem("refreshToken", action.payload.refreshToken);
      }
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      state.refreshToken = null;
      state.user = null;
      state.loading = false;
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
    },
    fixAuthState: (state) => {
      const token = localStorage.getItem("token");
      const user = parseUserFromStorage();
      if (token && user) {
        state.isLoggedIn = true;
        state.token = token;
        state.refreshToken = localStorage.getItem("refreshToken");
        state.user = user;
      } else {
        state.isLoggedIn = false;
        state.token = null;
        state.refreshToken = null;
        state.user = null;
      }
      state.loading = false;
    }
  },
});

export const { setLoading, login, logout, fixAuthState } = authSlice.actions;
export default authSlice.reducer;