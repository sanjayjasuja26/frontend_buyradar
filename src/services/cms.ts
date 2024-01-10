import fetchService from "./index"

export const cms = () => {
    return fetchService({
      endpoint: "/privacyPolicy",
      method: "GET",
      myHeaders: {
        'Content-Type': 'application/json',
      }
    })
  }