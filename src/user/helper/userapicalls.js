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

  //change Password
  export const changePassword= (user,token,password) => {
    return fetch(`${API}/user/${user}`,{
      method:"PUT",
      headers:{
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      "Content-Type": "application/json"
      },
      body: JSON.stringify(password)
    }).then(response => {
      return response.json();}
      ).
      catch(err => console.log(err))
  }

  //todo
  export const updatePassword = email => {
    console.log(email)
    return fetch(`${API}/user/forgotpassword`, {
      
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(email)
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
    
  }
