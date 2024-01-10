import { DEVICE_TYPE_WEB } from "app/constants";
import { BACKEND_API_BASE_URL } from "app/endpoints";
import { store } from "app/store";
import { removeUser } from "features/auth/authSlice";
import { logoutThunk } from "features/auth/authThunks";
import { getBuyRadarUser, removeBuyRadarUser } from "utils/helpers";

interface fetchTypes {
  endpoint: string,
  method: string,            
  body?: any,
  myHeaders?: any;
}

const fetchService = ({ endpoint, method, body, myHeaders }: fetchTypes) => {
  
  return fetch(`${BACKEND_API_BASE_URL}${endpoint}`, {
    method,
    headers: {
      ...myHeaders,
      Accept: 'application/json',
      Authorization: `Bearer ${getBuyRadarUser()?.token}`
    },
    body,
  })
    .then((res) => res.json())
    .then((response) => {
      console.log("response ====", response)
      if (response.success || response.status_code === 200) {
        return response;
      } else if(response.status_code === 401)  {
        // unauthenticated ;; logout now!!
        store.dispatch(logoutThunk({
          body: {
            device_type: DEVICE_TYPE_WEB,
            device_token: "",
          }
        }))
        store.dispatch(removeUser())           
        removeBuyRadarUser();
        throw response;
      } else {
        return response;
      }
    })           
    .catch((error) => {
      console.log('just error');
      console.log('@fetchService error =>', { endpoint, error });
      throw error;
    });

}

// export * from "./auth"

export default fetchService

