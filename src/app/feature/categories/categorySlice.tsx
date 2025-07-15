import { createSlice } from "@reduxjs/toolkit"

const initialState ={
    category:""
}
const categorySlice = createSlice({
    name:"category",
    initialState,
    reducers:{
        filiterCategoris:(state,action) => {
            state.category=action.payload
        }
    }
})
export const {filiterCategoris}=categorySlice.actions
export default categorySlice.reducer
