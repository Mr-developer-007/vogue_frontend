import { createSlice } from "@reduxjs/toolkit";

// Load from localStorage
const getWishlistFromStorage = () => {
  try {
    const data = localStorage.getItem("wishlist");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveWishlistToStorage = (wishlist) => {
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
};

const wishlistSlice = createSlice({
  name: "wishlist",

  initialState: {
    items: getWishlistFromStorage(),
  },

  reducers: {
    // ✅ GET Wishlist (reload from storage)
    getWishlist: (state) => {
      const data = localStorage.getItem("wishlist");
      state.items = data ? JSON.parse(data) : [];
    },

    addToWishlist: (state, action) => {
      const product = action.payload;

      const exists = state.items.find(
        (item) => item === product
      );

      if (!exists) {
        state.items.push(product);
        saveWishlistToStorage(state.items);
      }
    },

    removeFromWishlist: (state, action) => {
      const productId = action.payload;

      state.items = state.items.filter(
        (item) => item !== productId
      );

      saveWishlistToStorage(state.items);
    },

    clearWishlist: (state) => {
      state.items = [];
      saveWishlistToStorage([]);
    },
  },
});

export const {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;