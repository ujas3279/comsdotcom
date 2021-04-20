import React,{useState,useEffect} from "react";

import { API } from "../backend";
import Base from "./Base";
import Pcard from "./Card";
import { getProducts } from "./helper/coreapicalls";
import { Row, Col } from 'react-bootstrap'
import Menu from "./Menu";
import { Carousel, Image } from 'react-bootstrap'
import { Link } from "react-router-dom";

export default function Home() {

  const [products, setProducts] = useState([])
  const [error, setError] = useState(false)

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

  useEffect(() => {
    loadAllProduct()
  }, [])

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
          {products.map((product, index) => (
            <Col key={index} sm={12} md={6} lg={4} xl={3}>
              <Pcard product={product} />
            </Col>
          ))}
      </Row>
    </>
  );
}
