import { createSlice, current } from '@reduxjs/toolkit';
import { getCartThunk, removeFromCartThunk, addToCartThunk, getProfileThunk, editProfileThunk, statisticsThunk, addAddressThunk, cartCheckoutThunk } from "./userThunks"
import { CartInterface } from "types"
import { toast } from 'react-toastify';

export interface AuthState {
  // getCart 
  getCartStatus: 'idle' | 'loading' | 'failed';
  isGetCartError: boolean;
  getCartErrorMsg: string;
  cart: CartInterface;

  removeCartStatus: 'idle' | 'loading' | 'failed',
  removeCartError: string,

  cartCheckOutStatus: 'idle' | 'loading' | 'failed';
  isCartCheckOutError: boolean;
  cartCheckOutErrorMsg: string;

  // getProfile
  getProfileStatus: 'idle' | 'loading' | 'failed';
  isGetProfileError: boolean;
  getProfileErrorMsg: string;
  editProfileStatus: 'idle' | 'loading' | 'failed';
  isEditProfileError: boolean;
  editProfileErrorMsg: string;
  user: any;

  // getStatistics
  statisticsStatus: 'idle' | 'loading' | 'failed',
  isStatisticsError: boolean,
  statisticsErrorMsg: string,
  statistics: any,

  // getAddress
  addressStatus: 'idle' | 'loading' | 'failed',
  isAddressError: boolean,
  addressErrorMsg: string,
  address: any,
}

const initialState: AuthState = {

  getCartStatus: 'loading',
  isGetCartError: false,
  getCartErrorMsg: '',
  removeCartStatus: 'idle',
  removeCartError: '',
  cart: {
    cart_count: 0,
    items: [],
    shipping_cost: 0,
    total_cost: 0
  },
  cartCheckOutStatus: 'idle',
  isCartCheckOutError: false,
  cartCheckOutErrorMsg: '',

  getProfileStatus: 'loading',
  isGetProfileError: false,
  getProfileErrorMsg: '',
  editProfileStatus: 'idle',
  isEditProfileError: false,
  editProfileErrorMsg: '',
  user: {},

  statisticsStatus: 'idle',
  isStatisticsError: false,
  statisticsErrorMsg: '',
  statistics: {},

  addressStatus: 'idle',
  isAddressError: false,
  addressErrorMsg: '',
  address: {},
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    updateCartProducts: (state, action) => {
      const { payload } = action;
      let index = current(state).cart.items.findIndex((i: any) => i.product.id === payload.product_id)

      if (index > -1) {
        state.cart.items[index].product.isWishlist = payload.is_added
      }
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      // Get Profile
      .addCase(getProfileThunk.pending, (state) => {
        state.getProfileStatus = 'loading';
        state.isGetProfileError = false;
        state.editProfileErrorMsg = ''
      })
      .addCase(getProfileThunk.fulfilled, (state, action) => {
        const { data } = action.payload
        state.getProfileStatus = 'idle'
        state.getProfileErrorMsg = ""
        state.user = data
      })
      .addCase(getProfileThunk.rejected, (state, action) => {
        state.getProfileErrorMsg = action?.error?.message ? action.error.message : ""
        state.getProfileStatus = "failed"
        state.isGetProfileError = true
      })
      // Edit Profile
      .addCase(editProfileThunk.pending, (state) => {
        state.editProfileStatus = 'loading';
        state.isEditProfileError = false;
        state.editProfileErrorMsg = ''
      })
      .addCase(editProfileThunk.fulfilled, (state, action) => {
        state.editProfileStatus = 'idle'
        state.editProfileErrorMsg = ""
        toast.success(action.payload.message)
      })
      .addCase(editProfileThunk.rejected, (state, action) => {
        state.editProfileErrorMsg = action?.error?.message ? action.error.message : ""
        state.editProfileStatus = "failed"
        state.isEditProfileError = true
      })
      // Cart
      .addCase(getCartThunk.pending, (state) => {
        state.getCartStatus = 'loading';
        state.isGetCartError = false
      })
      .addCase(getCartThunk.fulfilled, (state, action) => {
        const { data } = action.payload
        state.getCartStatus = 'idle'
        state.getCartErrorMsg = ""
        state.cart = data
      })
      .addCase(getCartThunk.rejected, (state, action) => {
        state.getCartErrorMsg = action?.error?.message ? action.error.message : ""
        state.getCartStatus = "failed"
        state.isGetCartError = true
      })
      .addCase(removeFromCartThunk.pending, (state, action) => {
        state.removeCartStatus = "loading"
        state.removeCartError = ''
      })
      .addCase(removeFromCartThunk.fulfilled, (state, action) => {
        const { merchantId, productId } = action.payload;
        // modified as per bug fixing of multiple product removing instead of single
        // let cart: CartInterface = {
        //   items: [],
        //   cart_count: 0,
        //   shipping_cost: 0,
        //   total_cost: 0
        // };
        // let items = current(state).cart.items.filter((item: any) => {          
        //   if(item.merchant_id !== merchantId){
        //     cart.total_cost += item.price_when_added;
        //     cart.shipping_cost += item.shipping_price; 
        //     return item;
        //   }
        // })
        let productIndex = current(state).cart.items.findIndex(i => i.merchant_id === merchantId && i.product_id === productId)
        let productObj = current(state).cart.items.find(i => i.merchant_id === merchantId && i.product_id === productId)
        if (productIndex > -1 && productObj) {
          state.cart.total_cost = state.cart.total_cost - productObj.price_when_added;
          state.cart.shipping_cost = state.cart.shipping_cost - productObj.shipping_price;
          state.cart.items.splice(productIndex, 1)
          state.cart.cart_count = state.cart.cart_count - 1
        }
        state.getCartStatus = 'idle'
        state.getCartErrorMsg = ""

        state.removeCartStatus = "idle"
        state.removeCartError = ''


      })
      .addCase(removeFromCartThunk.rejected, (state, action) => {
        state.removeCartStatus = "failed"
        state.removeCartError = action?.error?.message ? action.error.message : ""
        toast.error(action.error.message)
      })
      .addCase(addToCartThunk.fulfilled, (state, action) => {
        const { data } = action.payload;
        toast.success(action.payload.message, {
          onClick: () => { window.location.href = "/cart" }
        });

        state.cart = { ...state.cart, cart_count: data.cart_count }
      })
      .addCase(addToCartThunk.rejected, (state, action) => {
        toast.error(action.error.message)
      })
      // Checkout
      .addCase(cartCheckoutThunk.pending, (state) => {
        state.cartCheckOutStatus = 'loading';
        state.isCartCheckOutError = false
        state.cartCheckOutErrorMsg = ''
      })
      .addCase(cartCheckoutThunk.fulfilled, (state, action) => {
        state.cartCheckOutStatus = 'idle';
        state.isCartCheckOutError = false
        state.cartCheckOutErrorMsg = ''

        state.cart = {
          items: [],
          cart_count: 0,
          shipping_cost: 0,
          total_cost: 0
        }
        toast.success(action.payload.message)
      })
      .addCase(cartCheckoutThunk.rejected, (state, action) => {
        state.cartCheckOutStatus = 'failed';
        state.isCartCheckOutError = true
        state.cartCheckOutErrorMsg = action?.error?.message ? action.error.message : ""
      })
      //  Statistics
      .addCase(statisticsThunk.pending, (state) => {
        state.statisticsStatus = 'loading';
        state.isStatisticsError = false;
        state.statisticsErrorMsg = ''
      })
      .addCase(statisticsThunk.fulfilled, (state, action) => {
        const { data } = action.payload;
        state.statisticsStatus = 'idle';
        state.statisticsErrorMsg = "";
        state.statistics = data
      })
      .addCase(statisticsThunk.rejected, (state, action) => {
        state.statisticsErrorMsg = action?.error?.message ? action.error.message : ""
        state.statisticsStatus = "failed"
        state.isStatisticsError = true
      })
      //  Address
      .addCase(addAddressThunk.pending, (state) => {
        state.addressStatus = 'loading';
        state.isAddressError = false;
        state.addressErrorMsg = ''
      })
      .addCase(addAddressThunk.fulfilled, (state, action) => {
        state.addressStatus = 'idle';
        state.addressErrorMsg = "";
        toast.success(action.payload.message)
      })
      .addCase(addAddressThunk.rejected, (state, action) => {
        state.addressErrorMsg = action?.error?.message ? action.error.message : ""
        state.addressStatus = "failed"
        state.isAddressError = true
      })
  },
});

export const { updateCartProducts } = userSlice.actions;
export default userSlice.reducer;
