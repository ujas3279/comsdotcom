import { API } from "../../backend";


//get user order
export const getOrder = (userId,token) => {
    return fetch(`${API}/user/order/${userId}`,{
      method:"GET",
      headers:{
        Authorization: `Bearer ${token}`
      }
    }).then(response => {
      return response.json();}
      ).
      catch(err => console.log(err))
  }