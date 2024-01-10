import { getWishList, addToWishList, removeFromWishList, getCart, addToCart, removeFromCart, getProfile, editProfile, myStatistics, addAddress, cartCheckout } from 'services/user';
import { createAsyncThunk } from '@reduxjs/toolkit';


//  Profile

export const getProfileThunk = createAsyncThunk(
  'user/getprofile',
  async () => {
    const response = await getProfile();
    return response
  }
);

export const editProfileThunk = createAsyncThunk(
  'user/editprofile',
  async ({ body }: { body: any }) => {
    const response = await editProfile({ body });
    return response
  }
);

//  Statistics

export const statisticsThunk = createAsyncThunk(
  'user/statistics',
  async () => {
    const response = await myStatistics();
    return response
  }
);

//  Address

export const addAddressThunk = createAsyncThunk(
  'user/address',
  async ({ body }: { body: any }) => {
    const response = await addAddress({ body });
    return response
  }
);

//  Wishlist

export const getWishListThunk = createAsyncThunk(
  'user/getWishList',
  async ({ body }: { body: any }) => {
    const response = await getWishList({ body });
    return response
  }
);

export const addToWishListThunk = createAsyncThunk(
  'user/addToWishList',
  async ({ body }: { body: any }) => {
    const response = await addToWishList({ body });
    return { product_id: body.product_id, ...response }
  }
);

export const removeFromWishListThunk = createAsyncThunk(
  'user/removeFromWishList',
  async ({ body }: { body: any }) => {
    const response = await removeFromWishList({ body });
    return response
  }
);

//  Cart

export const getCartThunk = createAsyncThunk(
  'user/getcart',
  async ({ body }: { body: any }) => {
    const response = await getCart({ body });
    return response
  }
);

export const addToCartThunk = createAsyncThunk(
  'user/addToCart',
  async ({ body }: { body: any }) => {    
    const response = await addToCart({ body });    
    return response
  }
);

export const removeFromCartThunk = createAsyncThunk(
  'user/removeFromCart',
  async ({ body }: { body: any }) => {
    const response = await removeFromCart({ body });
    return { ...response, productId: body.product_id, merchantId: body.merchant_id }
  }
);

export const cartCheckoutThunk = createAsyncThunk(
  'user/cartCheckout',
  async ({ body }: { body: any }) => {
    const response = await cartCheckout({ body });
    return response;
  }
);
