import { createSlice } from "@reduxjs/toolkit";
import { ProductInterface } from "types/product";
import { browseProductsThunk } from "./browseThunks";
export interface BrowseState {
  // browsefeed products
  isMoreProducts: boolean;
  products: ProductInterface[];
  browseProductsStatus: string;
  isBrowseProductsError: boolean;
  browseProductsErrorMsg: string;
  currentProductPage: number;
  totalBrowseProductPages: number;
  isMoreBrowseProducts: boolean;
  viewMoreStatus: string;
}

const initialState: BrowseState = {
  // browsefeed products
  isMoreProducts: false,
  products: [],
  browseProductsStatus: "idle",
  isBrowseProductsError: false,
  browseProductsErrorMsg: "",
  currentProductPage: 1,
  totalBrowseProductPages: 1,
  isMoreBrowseProducts: false,
  viewMoreStatus: "idle",
};

export const browseSlice = createSlice({
  name: "browse",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    viewMoreBrowseProducts: (state) => {
      state.isMoreProducts = true;
    },
    updateViewMoreBrowsePrducts: (state) => {
      state.isMoreBrowseProducts = true;
    },
    updateBrowseIsWishlist: (state, action) => {
      const { id, isWishlist } = action.payload;
      state.products.map((prod) => {
        if (prod.id === id) {
          prod.isWishlist = isWishlist;
        }
      });
    },
  },

  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      // browse feed
      .addCase(browseProductsThunk.pending, (state, action) => {
        state.isBrowseProductsError = false;
        state.browseProductsStatus = "loading";
        if (!state.isMoreProducts) {
          state.products = [];
          state.currentProductPage = 1;
          state.totalBrowseProductPages = 1;
        }
      })
      .addCase(browseProductsThunk.fulfilled, (state, action) => {
        const { products } = action.payload;
        state.browseProductsStatus = "idle";
        state.products = state.products.concat(products.data);
        state.currentProductPage = products.current_page;
        state.totalBrowseProductPages = products.last_page;
        state.viewMoreStatus = "idle";
        state.isMoreProducts = false;
      })
      .addCase(browseProductsThunk.rejected, (state, action) => {
        state.browseProductsStatus = "failed";
        state.isBrowseProductsError = true;
        state.browseProductsErrorMsg = action?.error?.message
          ? action.error.message
          : "";
      });
  },
});

export const {
  viewMoreBrowseProducts,
  updateViewMoreBrowsePrducts,
  updateBrowseIsWishlist,
} = browseSlice.actions;

export default browseSlice.reducer;
