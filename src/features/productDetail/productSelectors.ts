import { RootState, } from 'app/store';


export const productDetailSelector = (state: RootState) => {
  const { 
    productDetailStatus,
    isProductDetailError,
    productDetailErrorMsg,
    productDetail,
    targetPriceStatus,
    isTargetPriceError,
    targetPriceErrorMsg,
    targetPrice, 
    inCorrectPriceStatus,
    isIncorrectPriceError,
    inCorrectPriceErrorMsg,
    inCorrectPrice
  } = state.product

  return {
    productDetailStatus,
    isProductDetailError,
    productDetailErrorMsg,
    productDetail,
    targetPriceStatus,
    isTargetPriceError,
    targetPriceErrorMsg,
    targetPrice,
    inCorrectPriceStatus,
    isIncorrectPriceError,
    inCorrectPriceErrorMsg,
    inCorrectPrice 
  }
}

export const merchantSelector = (state: RootState) => {
  const {
    merchantsStatus,
    isMerchantsError,
    merchantsErrorMsg,
    merchants,
    merchantsPageTotal,
    currentMerchantsPage,
    viewMoreMerchants,
    isMoreMerchants,
    merchantListLimit,
    merchantTotalRecords,
  } = state.merchant;

  return {
    merchantsStatus,
    isMerchantsError,
    merchantsErrorMsg,
    merchants,
    merchantsPageTotal,
    currentMerchantsPage,
    viewMoreMerchants,
    isMoreMerchants,
    merchantListLimit,
    merchantTotalRecords,
  }
}

export const similarProductsSelector = (state: RootState) => {
  const {
    similarProductsStatus,
    isSimilarProductsError,
    similarProductsErrorMsg,
    similarProducts,
    similarProductsPageTotal,
    currentSimilarProductsPage,
    viewMoreSimilarProducts,
    isMoreSimilarProducts,
  } = state.product;

  return {
    similarProductsStatus,
    isSimilarProductsError,
    similarProductsErrorMsg,
    similarProducts,
    similarProductsPageTotal,
    currentSimilarProductsPage,
    viewMoreSimilarProducts,
    isMoreSimilarProducts,
  }    
}

export const recommendedProductsSelector = (state: RootState) => {
  const {
    recommendedProductsStatus,
    isRecommendedProductsError,
    recommendedProductsErrorMsg,
    recommendedProducts,
    recommendedProductsPageTotal,
    currentRecommendedProductsPage,
    viewMoreRecommendedProducts,
    isMoreRecommendedProducts,
  } = state.product;

  return {
    recommendedProductsStatus,
    isRecommendedProductsError,
    recommendedProductsErrorMsg,
    recommendedProducts,
    recommendedProductsPageTotal,
    currentRecommendedProductsPage,
    viewMoreRecommendedProducts,
    isMoreRecommendedProducts,
  }
}

export const productDetailLoaderSelector = (state: RootState) => {
  return state.product.productDetailStatus === "loading" ? true : false
}
