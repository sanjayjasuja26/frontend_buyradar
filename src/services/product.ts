import fetchService from "./index"

export const productDetail = ({ body }: { body: any }) => {
  return fetchService({
    endpoint: "/productdetail",
    method: "POST",
    body: JSON.stringify(body),
    myHeaders: {
      'Content-Type': 'application/json',
    }
  })
}

export const setPriority = ({ body }: { body: any }) => {
  return fetchService({
    endpoint: "/setPriority",
    method: "POST",
    body: JSON.stringify(body),
    myHeaders: {
      'Content-Type': 'application/json',
    }
  })
}

//Currently unused
export const resetPriority = ({ body }: { body: any }) => {
  return fetchService({
    endpoint: "/resetPriority",
    method: "POST",
    body: JSON.stringify(body),
    myHeaders: {
      'Content-Type': 'application/json',
    }
  })
}

export const merchantList = ({ body }: { body: any }) => {
  return fetchService({
    endpoint: "/getProductAllStores",
    method: "POST",
    body: JSON.stringify(body),
    myHeaders: {
      'Content-Type': 'application/json',
    }
  })
}

export const similarProducts = ({ body }: { body: any }) => {
  return fetchService({
    endpoint: "/similarProducts",
    method: "POST",
    body: JSON.stringify(body),
    myHeaders: {
      'Content-Type': 'application/json',
    }
  })
}

export const recommendedProducts = ({ body }: { body: any }) => {
  return fetchService({
    endpoint: "/recommended",
    method: "POST",
    body: JSON.stringify(body),
    myHeaders: {
      'Content-Type': 'application/json',
    }
  })
}

export const targetPrice = ({ body }: { body: any }) => {
  return fetchService({
    endpoint: "/addtargetprice",
    method: "POST",
    body: JSON.stringify(body),
    myHeaders: {
      'Content-Type': 'application/json',
    }
  })
}

export const incorrectPrice = ({ body }: { body: any }) => {
  return fetchService({
    endpoint: "/addProductReport",
    method: "POST",
    body: JSON.stringify(body),
    myHeaders: {
      'Content-Type': 'application/json',
    }
  })
}
