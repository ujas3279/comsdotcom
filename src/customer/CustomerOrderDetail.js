import React from 'react'
import { Row, Col, Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { isAutheticated } from '../auth/helper';
import Base from '../core/Base';
import Card from '../core/Card';


const CustomerOrderDetail = () => {
    const {
        user: { _id,purchases,role}
      } = isAutheticated();

      console.log(purchases)
    return (
      <>
      <h2 className="mb-4 text-center">Yours Orders</h2>
      <Link className='btn btn-light my-3' to={`/user/dashboard`}>
        go back
      </Link>

          <Table striped bordered responsive className='table-sm'>
            <thead>
              <tr>
                <th className="text-center">NAME</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            {purchases.map((order, index) => {
              return(
                <tr key={index}>
                  <td className="text-center py-4">{order.name}</td>
                  <td className="text-center">
                  <Link
                    to={`/admin/order/detail/${order._id}`}
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

export default CustomerOrderDetail;