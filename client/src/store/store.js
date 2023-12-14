import { configureStore, createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    info: "lol",
    isLoggedIn: true,
    isAuthor: false,
    pageNumber: 1,
  },
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      localStorage.setItem("token", action.payload.token);
    },
    logout(state) {
      state.isLoggedIn = false;
      localStorage.removeItem("token");
    },
    setInfo(state, { payload }) {
      state.info = payload.data;
    },
    checkAuthour(state, { payload }) {
      state.isAuthor = payload;
    },
    setPageNumber(state, { payload }) {
      state.pageNumber = payload;
    },
  },
});

const store = configureStore({ reducer: { auth: authSlice.reducer } });
export const authActions = authSlice.actions;
export default store;
