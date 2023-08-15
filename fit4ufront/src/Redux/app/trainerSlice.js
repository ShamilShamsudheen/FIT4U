import { createSlice } from "@reduxjs/toolkit";

const TrainerSlice = createSlice({
  name: "trainer",
  initialState: {
    trainerToken:null,
    trainername:null,
    authorized: false,
    
  },
  reducers: {
    trainerLogin(state, actions) {
      const newData = actions.payload;
      state.trainerToken = newData.token;
      state.trainername = newData.username;
      state.authorized = true;
      
      
    },
    trainerLogout(state) {
      state.trainerToken = null;
      state.trainername = null;
      state.authorized = false;
      
    },
  },
});
export const { trainerLogin, trainerLogout } = TrainerSlice.actions;
export default TrainerSlice;