import { createSlice } from "@reduxjs/toolkit";

const AdminSlice = createSlice({
  name: "admin",
  initialState: {
    adminToken:null,
    adminname:null,
    authorized: false,
    
  },
  reducers: {
    adminLogin(state, actions) {
      const newData = actions.payload;
      state.adminToken = newData.token;
      state.adminname = newData.username;
      state.authorized = true;
      
      
    },
    adminLogout(state) {
      state.adminToken = null;
      state.adminname = null;
      state.authorized = false;
      
    },
  },
});
export const { adminLogin, adminLogout } = AdminSlice.actions;
export default AdminSlice;