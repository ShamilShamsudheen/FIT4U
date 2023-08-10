import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "user",
  initialState: {
    userToken:null,
    username:null,
    authorized: false,
    
  },
  reducers: {
    userLogin(state, actions) {
      const newData = actions.payload;
      state.userToken = newData.token;
      state.username = newData.username;
      state.authorized = true;
      
      
    },
    userLogout(state) {
      state.userToken = null;
      state.username = null;
      state.authorized = false;
      
    },
  },
});
export const { userLogin, userLogout } = UserSlice.actions;
export default UserSlice;