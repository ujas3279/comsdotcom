import React from 'react'
import { Link } from 'react-router-dom';
import { isAutheticated } from '../auth/helper';
import Base from '../core/Base';



const UserDashBoard = () => {

    const {
        user: { name, email}
      } = isAutheticated();

    const adminLeftSide = () => {
        return (
          <div className="card">
            <h4 className="card-header bg-dark text-white">User Navigation</h4>
            <ul className="list-group">
              <li className="list-group-item">
                <Link to="/user/orders" className="nav-link text-success">
                  Your Orders
                </Link>
              </li>
              <li className="list-group-item">
                <Link to="/user/setting" className="nav-link text-success">
                  Setting
                </Link>
              </li>
              
              
            </ul>
          </div>
        );
      };
    
      const adminRightSide = () => {
        return (
          <div className="card mb-4">
            <h4 className="card-header">User Information</h4>
            <ul className="list-group">
              <li className="list-group-item">
                <span className="badge alert-success mr-2">Name:</span> {name}
              </li>
              <li className="list-group-item">
                <span className="badge alert-success mr-2">Email:</span> {email}
              </li>
    
              <li className="list-group-item">
                <span className="badge alert-danger">User Area</span>
              </li>
            </ul>
          </div>
        );
      };
      return (
        <>
          <div className="row">
            <div className="col-3">{adminLeftSide()}</div>
            <div className="col-9">{adminRightSide()}</div>
          </div>
        </>
      );
    };

export default UserDashBoard;