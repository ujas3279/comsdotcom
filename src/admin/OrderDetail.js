import React,{useState,useEffect} from 'react'
import Base from '../core/Base';
import { getOrder } from './helper/adminapicall';

import Card from '../core/Card';
import { Link } from 'react-router-dom';




const OrderDetail = ({match}) => {

    const [values, setValues] = useState({
        User_name: "",
        User_email:"",
        status: "",
        amount: "",
        address: "",
        transaction_id:"",
        products:[],
        error:""

      });
    
      const {
        User_name,
        User_email,
        status,
        amount,
        address,
        transaction_id,
        products,
        error
      } = values;

    
    const preload = (orderId) => {
        getOrder(orderId).then(data=>{
            console.log(data[0]);
            

            if(data.error)
            {
                setValues({ ...values, error: data.error });
            }
            else
            {
              const order=data[0];
                setValues({
                    ...values,
                    User_name : order.user.name,
                    User_email:order.user.email,
                    status : order.status,
                    amount: order.amount,
                    address: order.address,
                    transaction_id: order.transaction_id,
                    products: order.products
                })
            }
        })
    }

    useEffect(() => {
        preload(match.params.orderId);
      }, []);


    return (
        <>
        <Link className='btn btn-light my-3' to={`/admin/dashboard`}>
        go back
      </Link>
            <div className=" mr-5 col-12" ><span className="color-black">Name of user:</span> {User_name}</div>
            <div className=" mr-5 col-12" ><span className="color-black">Email of user:</span> {User_email}</div>
            <div className=" mr-5 col-12" ><span className="color-black">Order Status:  </span> {status}</div>
            <div className=" mr-5 col-12" ><span className="color-black">Order amount:</span> {amount}</div>
            <div className=" mr-5 col-12" ><span className="color-black">Order address:</span> {address}</div>
            <div className=" mr-5 col-12" ><span className="color-black">Transaction:</span> {transaction_id}</div>
            <div className=" mr-5 col-12" ><span className="color-black">Products:</span> </div>
            <div className="row">
          {products.map((product,index) => {
            return(
              <div key={index}  className="col-4 mb-4">
                <Card product={product} addtoCart={false} />
              </div>
            )
          })}

        </div>

        </>
    )
}

export default OrderDetail;

