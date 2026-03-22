import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../urls";


export const getCategory = createAsyncThunk(
  "category/get",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`${base_url}/category/user/get`);
      return res.data.data; 
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || err.message
      );
    }
  }
);


const initialState = {
  categories: [],
  loading: false,
  error: null,
};


const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    // (optional) reset state
    clearCategoryState: (state) => {
      state.categories = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 👉 Pending
      .addCase(getCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // 👉 Fulfilled
      .addCase(getCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })

      // 👉 Rejected
      .addCase(getCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});


export const { clearCategoryState } = categorySlice.actions;


export default categorySlice.reducer;