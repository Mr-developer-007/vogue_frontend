// "use client"
import { configureStore } from "@reduxjs/toolkit";
import category  from "./slices/CategorySlice"
import wishlist  from "./slices/WishlistSlice"


const store = configureStore({
    reducer:{
        category,
        wishlist,
    }
})

export default store