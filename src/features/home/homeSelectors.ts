import { RootState } from "app/store";

export const homeFeedSelector = (state: RootState) => {
  const {
    isMoreProducts,
    products,
    currentProductPage,
    homeFeedStatus,
    isHomeFeedError,
    homeFeedErrorMsg,
    productPageTotal,
  } = state.home;

  return {
    isMoreProducts,
    products,
    currentProductPage,
    homeFeedStatus,
    isHomeFeedError,
    homeFeedErrorMsg,
    productPageTotal,
  };
};

export const justForYouSelector = (state: RootState) => {
  const {
    justForYouProduct,
    justForYouProductStatus,
    isJustForYouProductError,
    isJustForYouProductErrorMsg,
    justForYouProductPageTotal,
    currentJustForYouProductPage,
    viewMoreJustForYouPrducts,
    justForYouMoreProductStatus,
    nextJustForYouProductPage
  } = state.home;
  return {
    justForYouProduct,
    justForYouProductStatus,
    isJustForYouProductError,
    isJustForYouProductErrorMsg,
    justForYouProductPageTotal,
    currentJustForYouProductPage,
    viewMoreJustForYouPrducts,
    justForYouMoreProductStatus,
    nextJustForYouProductPage
  };
};

export const wishlistSelector = (state: RootState) => {
  const {
    getWishListStatus,
    isGetWishListError,
    getWishListErrorMsg,
    wishList,
    recommended,
  } = state.home;

  return {
    getWishListStatus,
    isGetWishListError,
    getWishListErrorMsg,
    wishList,
    recommended,
  };
};

export const headerCategorySelector = (state: RootState) => {
  const {
    headerCategories,
    headerCategoriesStatus,
    isHeaderCategoriesError,
    headerCategoriesErrorMsg,
    currentHeaderCategoriesPage,
    currentHeaderCategoriesLimit,
    headerCategoriesPageTotal,
    viewMoreHeaderCategories,
    isMoreHeaderCategories,
  } = state.home;

  return {
    headerCategories,
    headerCategoriesStatus,
    isHeaderCategoriesError,
    headerCategoriesErrorMsg,
    currentHeaderCategoriesPage,
    currentHeaderCategoriesLimit,
    headerCategoriesPageTotal,
    viewMoreHeaderCategories,
    isMoreHeaderCategories,
  }
};

export const wishListCountSelector = (state: RootState) => {
  return state.home.wishListCount;
};

export const isWishlistLoaderSelector = (state: RootState) => {
  return state.home.getWishListStatus === "loading";
};

