import { createSlice } from "@reduxjs/toolkit"

const initialState ={
    isOnline:true
}
const networkSlice = createSlice({
    name:"network",
    initialState,
    reducers:{
        networkMode:(state,action) => {
            state.isOnline=action.payload
        }
    }
})
export const {networkMode}=networkSlice.actions
export default networkSlice.reducer
