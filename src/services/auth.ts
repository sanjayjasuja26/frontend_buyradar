import fetchService from "./index"

export const login = ({ body }: { body: any }) => {
  return fetchService({
    endpoint: "/login",
    method: "POST",
    body: JSON.stringify(body),
    myHeaders: {
      'Content-Type': 'application/json',
    }
  })
}

export const register = ({ body }: { body: any }) => {
  return fetchService({
    endpoint: "/register",
    method: "POST",
    body: JSON.stringify(body),
    myHeaders: {
      'Content-Type': 'application/json',
    }
  })
}

export const forgotPassword = ({ body }: { body: any }) => {
  return fetchService({
    endpoint: "/forgotPassword",
    method: "POST",
    body: JSON.stringify(body),
    myHeaders: {
      'Content-Type': 'application/json',
    }
  })
}

export const resetPassword = ({ body }: { body: any }) => {
  return fetchService({
    endpoint: "/resetpassword",
    method: "POST",
    body: JSON.stringify(body),
    myHeaders: {
      'Content-Type': 'application/json',
    }
  })
}

export const logout = ({ body }: { body: any }) => {
  return fetchService({
    endpoint: "/logout",
    method: "POST",
    body: JSON.stringify(body),
    myHeaders: {
      'Content-Type': 'application/json',
    }
  })
}

export const getAllCurrencies = ({ body }: { body: any }) => {
  return fetchService({
    endpoint: "/getAllCurrencies",
    method: "POST",
    myHeaders: {
      'Content-Type': 'application/json',
    }
  })
}

export const updateUserCurrency = ({ body }: { body: any }) => {
  return fetchService({
    endpoint: "/updateUserCurrency",
    method: "POST",
    body: JSON.stringify(body),
    myHeaders: {
      'Content-Type': 'application/json',
    }
  })
}
