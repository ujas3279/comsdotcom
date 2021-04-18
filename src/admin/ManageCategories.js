import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import { isAutheticated } from '../auth/helper';
import Base from '../core/Base';
import {deleteCategory, getCategories} from "./helper/adminapicall"
import { Row, Col, Table, Button } from 'react-bootstrap';

const ManageCategories = () => {

    const [Categories, setCategories] = useState([]);

    const {user,token} = isAutheticated();

    const preload = () => {
        getCategories().then(data => {
            if(data.error){
                console.log(data.error);
            }
            else{
                setCategories(data);
            }
        })
    }

    useEffect(() => {
        preload();
    }, [])

    const deleteThisCategory = categoryId => {
        deleteCategory(categoryId,user._id,token).then( data => {
            if(data.error){
                console.log(data.error);
            }
            else{
                preload();
            }
        })
    }

    return (
        <>
      <h2 className="mb-4 text-center">Categories</h2>
      <Link className='btn btn-light my-3' to={`/admin/dashboard`}>
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
            {Categories.map((category, index) => {
              return(
                <tr key={index}>
                  <td className="text-center py-4">{category.name}</td>
                  <td className="text-center">
                  <Link
                    to={`/admin/category/update/${category._id}`}
                  >
                  <Button variant='light' className="btn-sm"><i className='fas fa-edit'></i></Button>
                </Link>
                  </td>
                <td className="text-center">
                <Button onClick={() => {
                    deleteThisCategory(category._id);
                }} variant="danger" className="btn-sm">
                  <i className='fas fa-trash'></i>
                </Button>
                  </td>
                  </tr>
          
              )
          })}

          </tbody>
          </Table>

      
    </>
    )
}

export default ManageCategories;