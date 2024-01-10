import { RootState, } from 'app/store';


export const browseProductsSelector = (state: RootState) => {
  const { products,
    browseProductsStatus,
    isBrowseProductsError,
    browseProductsErrorMsg,
    currentProductPage,
    totalBrowseProductPages, isMoreBrowseProducts, viewMoreStatus } = state.browse

  return {
    products,
    browseProductsStatus,
    isBrowseProductsError,
    browseProductsErrorMsg,
    currentProductPage,
    totalBrowseProductPages,
    isMoreBrowseProducts,
    viewMoreStatus
  }
}
