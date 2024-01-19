import { createSlice } from "@reduxjs/toolkit";


const initialState= {
    themeValue: false
}
const UserSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        
        themeValue: (state,action)=>{
            console.log(action)
            state.themeValue = action.payload
        }
    }

})

export const {themeValue} = UserSlice.actions
export default UserSlice
