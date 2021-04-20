import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import { isAutheticated } from '../auth/helper';
import Base from '../core/Base';
import { getOrder} from "../user/helper/userapicalls"
import { Row, Col, Table, Button } from 'react-bootstrap';
import { API } from '../backend';

const CustomerOrders = () => {

    const [orders, setOrders] = useState([]);

    const {user,token} = isAutheticated();
    const AllOrder=[];
    const preload = () => {
        getOrder(user._id,token).then(data => {
            if(data.error){
                console.log(data.error);
            }
            else{
              setOrders(data)
                
            }
        })
        
        
    }
    console.log(orders)
    useEffect(() => {
        preload();
    }, [])

    

    return (
        <>
      <h2 className="mb-4 text-center">Orders</h2>
      <Link className='btn btn-light my-3' to={`/user/dashboard`}>
        go back
      </Link>
      
      <Table striped bordered responsive className='table-sm'>
            <thead>
              <tr>
                <th className="text-center">NAME</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => {
                console.log(order)
                return(
                <tr key={index}>
                  <td className="text-center py-4">{order.user.name}</td>
                  <td className="text-center">
                  <Link
                    to={`/user/order/detail/${order._id}`}
                  >
                  <Button className="brn-sm">Order detail</Button>
                </Link>
                  </td>
                
                  </tr>
                )
              })}
            </tbody>
      </Table>

          
    </>
    )
}

export default CustomerOrders;