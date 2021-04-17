import React, { useState, useEffect } from "react";
import { isAutheticated } from "../auth/helper";
import { cartEmpty, loadCart } from "./helper/CartHelper";
import { Link } from "react-router-dom";
import StripeCheckoutButton from "react-stripe-checkout";
import { API } from "../backend";
import { createOrder } from "./helper/OrderHelper";
import * as emailjs from "emailjs-com";
require('dotenv').config();

const StripeCheckout = ({
  products,
  setReload = f => f,
  reload = undefined
}) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: ""
  });

  const usertoken = isAutheticated() && isAutheticated().token;
  const userId = isAutheticated() && isAutheticated().user._id;

  const useremail=isAutheticated() && isAutheticated().user.email;
  const username=isAutheticated() && isAutheticated().name;
let famount=0;
  const getFinalAmount = () => {
    let amount = 0;
    products.map(p => {
      amount = amount + p.price;
    });
    famount=amount;
    return amount;
  };
  const SendEmail=  (data)=>{
 
    emailjs.send(process.env.REACT_APP_SERVICE_ID, process.env.REACT_APP_ORDER_TEMPLET, data,process.env.REACT_APP_USER_ID)
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      })
    };
  const makePayment = token => {
    const body = {
      token,
      products
    };
    const headers = {
      "Content-Type": "application/json"
    };
    return fetch(`${API}/stripepayment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body)
    })
      .then(response => {
        console.log(response);
        console.log(token.card.address_line1);
        let useraddress=token.card.name +","+token.card.address_line1+","+token.card.address_city+","+token.card.address_zip+","+token.card.address_country;
        console.log(useraddress);
        const orderData={
            products:products,
            transaction_id:token.card.id,
            amount:famount,
            address:useraddress
        }
        const maildata={
              to_email:useremail,
              to_name:token.card.name,
              address:useraddress,
              amount:famount
              
        }
       
        
        cartEmpty(()=>{

        })
        createOrder(userId, usertoken, orderData);
        SendEmail(maildata);
        setReload(!reload);
        console.log(response.status);
      })
      .catch(error => console.log(error));
  };

  const showStripeButton = () => {
    return isAutheticated() ? (
      <StripeCheckoutButton
        stripeKey = {process.env.REACT_APP_PUB_KEY}
        token={makePayment}
        amount={getFinalAmount() * 100}
        name="Buy Tshirts"
        currency="inr"
        shippingAddress
      >
        <button className="btn btn-success">Process To Checkout</button>
      </StripeCheckoutButton>
    ) : (
      <Link to="/signin">
        <button className="btn btn-warning">Signin</button>
      </Link>
    );
  };

  return (
    <div>
      <h3 className="text-white">Total Amount <i class="fa fa-inr"></i> {getFinalAmount()}</h3>
      {showStripeButton()}
    </div>
  );
};

export default StripeCheckout;