import { RootState, } from 'app/store';


export const userSelector = (state: RootState) => {
  const {
    getCartStatus,
    isGetCartError,
    getCartErrorMsg,
    removeCartStatus,
    removeCartError,
    cartCheckOutStatus,
    isCartCheckOutError,
    cartCheckOutErrorMsg,
    cart,
    getProfileStatus,
    isGetProfileError,
    getProfileErrorMsg,
    editProfileStatus,
    isEditProfileError,
    editProfileErrorMsg,
    user,
    statisticsStatus,
    isStatisticsError,
    statisticsErrorMsg,
    statistics, 
    addressStatus,
    isAddressError,
    addressErrorMsg,
    address,
  } = state.user

  return {
    getCartStatus,
    isGetCartError,
    getCartErrorMsg,
    removeCartStatus,
    removeCartError,
    cart,
    cartCheckOutStatus,
    isCartCheckOutError,
    cartCheckOutErrorMsg,
    getProfileStatus,
    isGetProfileError,
    getProfileErrorMsg,
    editProfileStatus,
    isEditProfileError,
    editProfileErrorMsg,
    user,
    statisticsStatus,
    isStatisticsError,
    statisticsErrorMsg,
    statistics,
    addressStatus,
    isAddressError,
    addressErrorMsg,
    address,
  }
}

export const cartCountSelector = (state: RootState) => {
  return state.user.cart.cart_count
}
