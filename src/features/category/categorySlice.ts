import { createSlice } from "@reduxjs/toolkit";
import { CategoriesInterface } from "types";
import { categoriesThunk } from "./categoryThunk";
import uniqBy from "lodash.uniqby";
export interface CategoryState {
  // categories
  categories: CategoriesInterface[];
  categoriesStatus: "idle" | "loading" | "failed";
  moreCategoriesStatus: "idle" | "loading" | "failed";
  isCategoriesError: boolean;
  categoriesErrorMsg: string;
  currentCategoriesPage: number;
  currentCategoriesLimit: number;
  categoriesPageTotal: number;
  viewMoreCategories: boolean;
  isMoreCategories: boolean;
  categorySearch: string;
  categoriesClone: CategoriesInterface[];
}

const initialState: CategoryState = {
  // categories
  categories: [],
  categoriesClone: [],
  categoriesStatus: "loading",
  moreCategoriesStatus: "idle",
  isCategoriesError: false,
  categoriesErrorMsg: "",
  categoriesPageTotal: 1,
  currentCategoriesPage: 1,
  currentCategoriesLimit: 10,
  viewMoreCategories: false,
  isMoreCategories: false,
  categorySearch: "",
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    updateViewMoreCategories: (state) => {
      state.viewMoreCategories = true;
      state.currentCategoriesPage = state.currentCategoriesPage + 1;
    },
    initialCategoryPage: (state) => {
      state.currentCategoriesPage = 1;
    },
    reArrangeCategories: (state, action) => {
      // console.log("action ===", action)
      let oldCategories = state.categories;
      let selectedCategory = oldCategories.find(
        (i) => i.id === action.payload.categoryId
      );
      let selectedCategoryIndex = oldCategories.findIndex(
        (i) => i.id === action.payload.categoryId
      );
      if (selectedCategory && selectedCategoryIndex > -1) {
        oldCategories.splice(selectedCategoryIndex, 1);
        oldCategories.splice(0, 0, selectedCategory);
        // state.categories = oldCategories
        state.categoriesClone = oldCategories;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // categories
      .addCase(categoriesThunk.pending, (state, action) => {
        // console.log("categoriesThunk.pending ===", action)
        state.isCategoriesError = false;
        state.categorySearch = action.meta.arg.body.search_keyword;

        // if (!state.viewMoreCategories) {
        if (action.meta.arg.body.page === 1) {
          state.categoriesStatus = "loading";
          state.categories = [];
          state.currentCategoriesPage = 1;
        } else {
          state.moreCategoriesStatus = "loading";
        }
      })
      .addCase(categoriesThunk.fulfilled, (state, action) => {
        const { data, current_page, last_page } = action.payload;
        const newCategories = state.categories.concat(data);
        state.categoriesStatus = "idle";
        state.moreCategoriesStatus = "idle";
        const appendedCategories = state.categoriesClone.concat(data);
        state.categoriesClone = uniqBy(appendedCategories, "id");
        state.currentCategoriesPage = current_page;
        state.categoriesPageTotal = last_page;
        state.viewMoreCategories = false;
        state.categoriesErrorMsg = "";
        state.categories = uniqBy(newCategories, "id");
      })
      .addCase(categoriesThunk.rejected, (state, action) => {
        state.categoriesErrorMsg = action?.error?.message
          ? action.error.message
          : "";
        state.categoriesStatus = "failed";
        state.moreCategoriesStatus = "failed";
        state.isCategoriesError = true;
        state.categories = [];
        state.categorySearch = "";
      });
  },
});

export const {
  initialCategoryPage,
  updateViewMoreCategories,
  reArrangeCategories,
} = categorySlice.actions;
export default categorySlice.reducer;
