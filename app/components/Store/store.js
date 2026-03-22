// "use client"
import { configureStore } from "@reduxjs/toolkit";
import category  from "./slices/CategorySlice"
const store = configureStore({
    reducer:{
        category
    }
})

export default store