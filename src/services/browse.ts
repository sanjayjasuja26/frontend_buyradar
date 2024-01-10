import fetchService from "./index"

export const headerSearchApi = ({ body }: { body: any }) => {
  return fetchService({
    endpoint: "/searchbar",
    method: "POST",                        
    body: JSON.stringify(body),                  
    myHeaders: {
      'Content-Type': 'application/json',
    }
  })
}                

export const browseProducts = ({ body }: { body: any }) => {
  return fetchService({    
    endpoint: "/browseFeedWeb",
    // endpoint: "/browsefeeds",
    method: "POST",                           
    body: JSON.stringify(body),
    myHeaders: {                       
      'Content-Type': 'application/json',
    }            
  })
}
