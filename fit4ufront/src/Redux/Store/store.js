import {configureStore} from '@reduxjs/toolkit'
import UserSlice from '../app/userSlice'
import TrainerSlice from '../app/trainerSlice'
import AdminSlice from '../app/adminSlice'




const store = configureStore({
   reducer:{ user:UserSlice.reducer ,traner:TrainerSlice.reducer ,admin:AdminSlice.reducer}
})
export default store