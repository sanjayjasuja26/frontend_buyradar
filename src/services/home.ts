import fetchService from "./index"

export const homeFeed = ({ body }: { body: any }) => {
  return fetchService({
    endpoint: "/homeFeedWeb",
    // homefeed
    method: "POST",
    body: JSON.stringify(body),
    myHeaders: {
      'Content-Type': 'application/json',
    }
  })
}

export const justForYou = ({ body }: { body: any }) => {
  return fetchService({
    endpoint: "/justForYou",
    method: "POST",
    body: JSON.stringify(body),
    myHeaders: {
      'Content-Type': 'application/json',
    }
  })
}

export const getWishList = ({ body }: { body: any }) => {
  return fetchService({
    endpoint: "/wishlist/products",
    method: "POST",
    body: JSON.stringify(body),
    myHeaders: {
      'Content-Type': 'application/json',
    }
  })
}

export const addToWishList = ({ body }: { body: any }) => {
  return fetchService({
    endpoint: "/wishlist/add",
    method: "POST",
    body: JSON.stringify(body),
    myHeaders: {
      'Content-Type': 'application/json',
    }
  })
}

export const removeFromWishList = ({ body }: { body: any }) => {
  return fetchService({
    endpoint: "/wishlist/delete",
    method: "POST",
    body: JSON.stringify(body),
    myHeaders: {
      'Content-Type': 'application/json',
    }
  })
}

