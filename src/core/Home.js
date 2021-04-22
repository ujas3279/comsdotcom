import React,{useState,useEffect} from "react";

import { API } from "../backend";
import Base from "./Base";
import Pcard from "./Card";
import { getProducts } from "./helper/coreapicalls";
import { Row, Col,Form } from 'react-bootstrap'
import Menu from "./Menu";
import { Carousel, Image } from 'react-bootstrap'
import { Link } from "react-router-dom";
import FormContainer from "../user/helper/FormContainer"
export default function Home() {

  const [products, setProducts] = useState([])
  const [error, setError] = useState(false)
  const [search, setSearch] = useState("");
  const [reload, setReload] = useState(false);
  const loadAllProduct = () => {
    getProducts().then(data => {
      if(data.error){
        setError(data.error);
      }
      else{
        setProducts(data);
      }
    })
  }
  const handleChange = (event) => {
    setSearch(event.target.value);
    setReload(!reload);
};

  useEffect(() => {
    loadAllProduct()
  }, [reload])

  return (
    <>
    
      
      <Form.Group controlId='search' className="search">
              <Form.Control 
                type='name'
                placeholder='Search Product'
                value={search}
                onChange={handleChange}
                className='mr-sm-2 ml-sm-5'
              ></Form.Control>
      </Form.Group>
    
      <h1>Latest Products</h1>
      <Row>
          {products.map((product, index) => (
            product.name.toLowerCase().match(`${search}`) && (<Col key={index} sm={12} md={6} lg={4} xl={3}>
             <Pcard product={product} />
            </Col>)
          ))}
      </Row>
    </>
  );
}
