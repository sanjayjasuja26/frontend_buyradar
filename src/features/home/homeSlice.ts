import { createSlice } from "@reduxjs/toolkit";
import {
  homeFeedThunk,
  getWishListThunk,
  addToWishListThunk,
  removeFromWishListThunk,
  justForYouThunk,
  headerCategoriesThunk,
} from "./homeThunks";
import { CategoriesInterface, ProductInterface } from "types";
export interface HomeState {
  // home feed
  isHomeFeed: boolean;
  homeFeedStatus: "idle" | "loading" | "failed";
  isHomeFeedError: boolean;
  homeFeedErrorMsg: string;

  // products
  isMoreProducts: boolean;
  products: ProductInterface[];
  currentProductPage: number;
  productPageTotal: number;

  // header categories
  headerCategories: CategoriesInterface[];
  headerCategoriesStatus: 'idle' | 'loading' | 'failed';
  isHeaderCategoriesError: boolean;
  headerCategoriesErrorMsg: string;
  currentHeaderCategoriesPage: number;
  currentHeaderCategoriesLimit: number;
  headerCategoriesPageTotal: number;
  viewMoreHeaderCategories: boolean;
  isMoreHeaderCategories: boolean,

  // justForYouProduct
  justForYouProduct: ProductInterface[];
  justForYouProductStatus: "idle" | "loading" | "failed";
  isJustForYouProductError: boolean;
  isJustForYouProductErrorMsg: string;
  justForYouProductPageTotal: number;
  currentJustForYouProductPage: number;
  viewMoreJustForYouPrducts: boolean;
  nextJustForYouProductPage: number;
  justForYouMoreProductStatus: "idle" | "loading" | "failed";

  // getWishlist
  getWishListStatus: "idle" | "loading" | "failed";
  isGetWishListError: boolean;
  getWishListErrorMsg: string;
  wishList: any;
  wishListCount: number;

  recommended: any[];
}

const initialState: HomeState = {
  isHomeFeed: false,
  homeFeedStatus: "idle",
  isHomeFeedError: false,
  homeFeedErrorMsg: "",

  // products
  isMoreProducts: false,
  products: [],
  currentProductPage: 1,
  productPageTotal: 1,

  // header categories
  headerCategories: [],
  headerCategoriesStatus: 'idle',
  isHeaderCategoriesError: false,
  headerCategoriesErrorMsg: '',
  currentHeaderCategoriesPage: 1,
  headerCategoriesPageTotal: 1,
  currentHeaderCategoriesLimit: 7,
  viewMoreHeaderCategories: false,
  isMoreHeaderCategories: false,

  // justForYouProduct
  justForYouProduct: [],
  justForYouProductStatus: "idle",
  isJustForYouProductError: false,
  isJustForYouProductErrorMsg: "",
  justForYouProductPageTotal: 1,
  currentJustForYouProductPage: 1,
  nextJustForYouProductPage: 2,
  viewMoreJustForYouPrducts: false,
  justForYouMoreProductStatus: 'idle',

  // wishlist
  getWishListStatus: "idle",
  isGetWishListError: false,
  getWishListErrorMsg: "",
  wishList: [],
  wishListCount: 0,

  recommended: [],


};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    viewMoreProducts: (state) => {
      state.isMoreProducts = true;
    },
    updateViewMoreJustForYouPrducts: (state) => {
      state.viewMoreJustForYouPrducts = true; 
    },
    updateProductIsWishlist: (state, action) => {
      const { isWishlistRecommended, isWishlist } = action.payload;

      // for product listing page
      state.products.map(prod => {
        if (prod.id === action.payload.id) {
          prod.isWishlist = isWishlist;
        }
      })

      // for justforyou product listing page
      state.justForYouProduct.map(prod => {
        if (prod.id === action.payload.id) {
          prod.isWishlist = isWishlist;
        }
      })

      // for recomneded products wishlist page

      if (isWishlistRecommended) {

        let recommendedIndex = state.recommended.findIndex(
          (i: any) => i.id === action.payload.id
        );
        if (recommendedIndex > -1) {
          state.recommended[recommendedIndex].isWishlist = isWishlist;
        }
        if (isWishlist) {
          state.wishList = [
            ...state.wishList,
            { product_id: action.payload.id, product: action.payload.product },
          ];
        }
      }
    },
    updateWishlistCount: (state, action) => {
      state.wishListCount = action.payload.isWishlist
        ? state.wishListCount + 1
        : state.wishListCount - 1;
    },
  },
  extraReducers: (builder) => {
    builder
      // home feed
      .addCase(homeFeedThunk.pending, (state) => {
        state.isHomeFeedError = false;
        if (!state.isMoreProducts) {
          state.homeFeedStatus = "loading";
          state.products = [];
          state.currentProductPage = 1;
          state.productPageTotal = 1;
        }
      })
      .addCase(homeFeedThunk.fulfilled, (state, action) => {
        const { products } = action.payload;
        state.homeFeedStatus = "idle";
        state.homeFeedErrorMsg = "";
        state.products = state.products.concat(products.data);
        state.currentProductPage = products.current_page;
        state.productPageTotal = products.last_page;
        state.isMoreProducts = false;
      })
      .addCase(homeFeedThunk.rejected, (state, action) => {
        state.homeFeedErrorMsg = action?.error?.message
          ? action.error.message
          : "";
        state.homeFeedStatus = "failed";
        state.isHomeFeedError = true;
      })
      // header categories
      .addCase(headerCategoriesThunk.pending, (state) => {
        state.isHeaderCategoriesError = false;
        if (!state.viewMoreHeaderCategories) {
          state.headerCategoriesStatus = 'loading';
          state.headerCategories = [];
          state.currentHeaderCategoriesPage = 1;
        }
      })
      .addCase(headerCategoriesThunk.fulfilled, (state, action) => {
        const { data, current_page, last_page } = action.payload
        state.headerCategoriesStatus = "idle"
        state.headerCategories = data
        state.currentHeaderCategoriesPage = current_page
        state.headerCategoriesPageTotal = last_page
        state.viewMoreHeaderCategories = false
        state.headerCategoriesErrorMsg = ''
      })
      .addCase(headerCategoriesThunk.rejected, (state, action) => {
        state.headerCategoriesErrorMsg = action?.error?.message ? action.error.message : ""
        state.headerCategoriesStatus = "failed"
        state.isHeaderCategoriesError = true
        state.headerCategories = []
      })
      // justForYou
      .addCase(justForYouThunk.pending, (state, action) => {
        // console.log("justForYouThunk.pending ======", action)
        state.isJustForYouProductError = false;
        if (!action.meta.arg.isMore) {
          state.justForYouProductStatus = "loading";
          state.justForYouProduct = [];
          // state.currentJustForYouProductPage = 1;
        } else {
          console.log("isMore trueeeeee")
          state.justForYouMoreProductStatus = 'loading'
          // state.currentJustForYouProductPage = products.current_page;
          // state.nextJustForYouProductPage = action.meta.arg.body.nextJustForYouProductPage
        }
        state.currentJustForYouProductPage = action.meta.arg.body.page
      })
      .addCase(justForYouThunk.fulfilled, (state, action) => {
        const { products } = action.payload;
        state.justForYouProductStatus = "idle";
        state.justForYouMoreProductStatus = "idle";
        state.justForYouProduct = state.justForYouProduct.concat(products.data);
        state.currentJustForYouProductPage = products.current_page;
        // state.nextJustForYouProductPage
        state.justForYouProductPageTotal = products.last_page;
        state.viewMoreJustForYouPrducts = false;
      })
      .addCase(justForYouThunk.rejected, (state, action) => {
        state.isJustForYouProductErrorMsg = action?.error?.message
          ? action.error.message
          : "";
        state.justForYouProductStatus = "failed";
        state.justForYouMoreProductStatus = "idle";
        state.isJustForYouProductError = true;
      })
      // getWishList
      .addCase(getWishListThunk.pending, (state) => {
        state.getWishListStatus = "loading";
        state.isGetWishListError = false;
      })
      .addCase(getWishListThunk.fulfilled, (state, action) => {
        const { data } = action.payload;
        state.getWishListStatus = "idle";
        state.getWishListErrorMsg = "";
        state.wishList = data.wishlist;
        state.wishListCount = data.wishlist.length;
      })
      .addCase(getWishListThunk.rejected, (state, action) => {
        state.getWishListErrorMsg = action?.error?.message
          ? action.error.message
          : "";
        state.getWishListStatus = "failed";
        state.isGetWishListError = true;
      })
      // add to wishlist
      .addCase(addToWishListThunk.fulfilled, (state, action) => {
        state.wishListCount = state.wishListCount + 1;
      })
      // remove from wishlist
      .addCase(removeFromWishListThunk.fulfilled, (state, action) => {
        const { product_id } = action.payload;
        state.wishList = [
          ...state.wishList.filter((i: any) => i.product_id !== product_id),
        ];
        state.wishListCount = state.wishListCount - 1;
        let recommendedIndex = state.recommended.findIndex(
          (i: any) => i.id === product_id
        );
        if (recommendedIndex > -1) {
          state.recommended[recommendedIndex].isWishlist = false;
        }
      })
  },
});
export const {
  viewMoreProducts,
  updateProductIsWishlist,
  updateWishlistCount,
  updateViewMoreJustForYouPrducts,
} = homeSlice.actions;

export default homeSlice.reducer;
