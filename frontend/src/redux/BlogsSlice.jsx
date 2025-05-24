import { createSlice } from "@reduxjs/toolkit"



export const BlogsSlice = createSlice({
    name:"Blogs",
    initialState:{
        allblogs:[],
    },
    reducers:{
        SetBlogs:(state,action)=>{
            state.allblogs = action.payload
        }
    }

})

export const {SetBlogs} = BlogsSlice.actions
export default BlogsSlice.reducer