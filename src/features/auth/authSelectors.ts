import { RootState, } from 'app/store';


export const selectLoginState = (state: RootState) => {
  const { isLoggedIn,
    isLoggingStatus,
    isLoggingError,
    loggingErrorMsg,
    user } = state.auth

  return {
    isLoggedIn,
    isLoggingStatus,
    isLoggingError,
    loggingErrorMsg,
    user
  }
}

export const selectRegisterState = (state: RootState) => {
  const {
    isRegisterSuccess,
    isRegisterStatus,
    isRegisterError,
    registerErrorMsg,
  } = state.auth

  return {
    isRegisterSuccess,
    isRegisterStatus,
    isRegisterError,
    registerErrorMsg,
  }
}

export const selectForgotPasswordState = (state: RootState) => {
  const {
    forgotPasswordStatus,
    isForgotPasswordError,
    forgotPasswordErrorMsg,
    isForgotPasswordSuccess
  } = state.auth
  return {
    forgotPasswordStatus,
    isForgotPasswordError,
    forgotPasswordErrorMsg,
    isForgotPasswordSuccess
  }
}

export const selectResetPasswordState = (state: RootState) => {
  const {
    resetPasswordStatus,
    isResetPasswordError,
    resetPasswordErrorMsg,
    isResetPasswordSuccess
  } = state.auth
  return {
    resetPasswordStatus,
    isResetPasswordError,
    resetPasswordErrorMsg,
    isResetPasswordSuccess
  }
}

export const loggedInUserSelector = (state: RootState) => {
  return state.auth.user
}

export const isUpdatingCurrencySelector = (state: RootState) => {
  return state.auth.updateCurrencyStatus === "loading" ? true : false
}

export const isLoggingLoaderSelector = (state: RootState) => {
  return state.auth.isLoggingStatus === "loading" ? true : false
}

export const isRegisterLoaderSelector = (state: RootState) => {
  return state.auth.isRegisterStatus === "loading" ? true : false
}

export const currencyStateSelector = (state: RootState) => {
  return {
    allCurrencies: state.auth.allCurrencies,
    selectedCurrency: state.auth.selectedCurrency,
    currencyStatus: state.auth.currencyStatus,
  };
};
