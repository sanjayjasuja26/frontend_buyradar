import fetchService from "./index"

//    Profile

export const getProfile = () => {
  return fetchService({
    endpoint: "/profile",
    method: "GET",
    myHeaders: {
      'Content-Type': 'application/json',
    }
  })
}

export const editProfile = ({ body }: { body: any }) => {
  if(body.phone){
    body = { ...body, phone: Number(body.phone) }
  }  
  if(body.country_code){
    body = { ...body, country_code: Number(body.country_code) }
  }  

  return fetchService({
    endpoint: "/editprofile",
    method: "POST",
    body: JSON.stringify(body),
    myHeaders: {
      'Content-Type': 'application/json',
    }
  })
}

//  Statistics

export const myStatistics = () => {
  return fetchService({
    endpoint: "/mystatistics",
    method: "GET",
    myHeaders: {
      'Content-Type': 'application/json',
    }
  })
}

//  Address

export const addAddress = ({ body }: { body: any }) => {
  if(body.phone){
    body = { ...body, phone: Number(body.phone) }
  }
  if(body.country_code){
    body = { ...body, country_code: Number(body.country_code) }
  }
  if(body.address_zip_code){
    body = { ...body, address_zip_code: Number(body.address_zip_code) }
  }

  return fetchService({
    endpoint: "/addhomeaddress",
    method: "POST",
    body: JSON.stringify(body),
    myHeaders: {
      'Content-Type': 'application/json',
    }
  })
}
//    Wishlist

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

//    Cart

export const getCart = ({ body }: { body: any }) => {
  return fetchService({
    endpoint: "/mycart",
    method: "POST",
    body: JSON.stringify(body),
    myHeaders: {
      'Content-Type': 'application/json',
    }
  })
}

export const addToCart = ({ body }: { body: any }) => {
  return fetchService({
    endpoint: "/addtocart",
    method: "POST",
    body: JSON.stringify(body),
    myHeaders: {
      'Content-Type': 'application/json',
    }
  })
}

export const removeFromCart = ({ body }: { body: any }) => {
  return fetchService({
    endpoint: "/deletecartproduct",
    method: "POST",
    body: JSON.stringify(body),
    myHeaders: {
      'Content-Type': 'application/json',
    }
  })
}

export const cartCheckout = ({ body }: { body: any }) => {
  return fetchService({
    endpoint: "/checkout",
    method: "POST",
    body: JSON.stringify(body),
    myHeaders: {
      'Content-Type': 'application/json',
    }
  })
}