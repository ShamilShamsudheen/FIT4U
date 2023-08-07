import {configureStore} from '@reduxjs/toolkit'
import UserSlice from '../app/userSlice'




const store = configureStore({
   reducer:{ user:UserSlice.reducer }
})
export default store