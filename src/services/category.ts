import fetchService from "./index"

export const categories = ({ body }: { body: any }) => {
    return fetchService({
      endpoint: "/categories",
      method: "POST",
      body: JSON.stringify(body),
      myHeaders: {
        'Content-Type': 'application/json',
      }
    })
  }