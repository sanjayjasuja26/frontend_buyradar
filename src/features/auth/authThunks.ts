import { login, register, forgotPassword, resetPassword, logout, getAllCurrencies, updateUserCurrency } from 'services/auth';
import { checkGuestMode, getBuyRadarUser, setBuyRadarUser, updateBuyRadarUser } from "utils/helpers"
import { createAsyncThunk } from '@reduxjs/toolkit';


export const loginThunk = createAsyncThunk(
  'auth/login',
  async ({ body }: { body: any }) => {
    const response = await login({ body });
    const user = { ...response.data, token: response.token }
    // checkGuestMode();
    setBuyRadarUser(user)
    return user
  }
);

export const registerThunk = createAsyncThunk(
  'auth/register',
  async ({ body, callback }: { body: any, callback: any }) => {
    const response = await register({ body });
    const user = { ...response.data, token: response.token }
    callback.resetForm()
    return user
  }
);

export const forgotPasswordThunk = createAsyncThunk(
  'auth/forgotPassword',
  async ({ body, callback }: { body: any; callback: any }) => {
    const response = await forgotPassword({ body });
    callback.resetForm()
    return response
  }
);

export const resetPasswordThunk = createAsyncThunk(
  'auth/resetPassword',
  async ({ body, callback }: { body: any, callback: any }) => {
    const response = await resetPassword({ body });
    callback.resetForm()
    return response
  }
);

export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async ({ body }: { body: any }) => {
    const response = await logout({ body });
    return response
  }
);

export const getAllCurrenciesThunk = createAsyncThunk(
  'home/getAllCurrencies',
  async ({ body }: { body: any }) => {
    const { data } = await getAllCurrencies({ body });
    return data
  }
);

export const updateUserCurrencyThunk = createAsyncThunk(
  'home/updateUserCurrency',
  async ({ body, selected_currency }: { body: any, selected_currency?: any }) => {
    const response = await updateUserCurrency({ body });
    const user = { ...getBuyRadarUser(), selected_currency }
    updateBuyRadarUser(user)
    console.log("updateUserCurrencyThunk ===response", response)
    setTimeout(() => {
      window.location.reload()
    }, 500)
    return response
  }
);
