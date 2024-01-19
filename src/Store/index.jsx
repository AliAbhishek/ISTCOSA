import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "../Slice";



export const store=configureStore({
    reducer:{
        ThemeReducer:UserSlice.reducer
    }
})