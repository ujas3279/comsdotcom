import React, { useState, useEffect } from "react";
import "../styles.css";

import { loadCart } from "./helper/CartHelper";
import StripeCheckout from "./StripeCheckout";
import { addItemToCart, removeItemFromCart } from './helper/CartHelper';
import ImageHepler from './helper/ImageHepler';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import { Link, Redirect } from "react-router-dom";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);  

  const addToCart = () => {
    addItemToCart(products, () => setRedirect(true));
  };

  const getARedirect = redirect => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  return (
    <>
    <h1>Shopping Cart</h1>
      <Row>
      {getARedirect(redirect)}
      
      <Col md={8}>
        
        {products.length === 0 ? (
          <h4>
            Your cart is empty <Link to='/'>Go Back</Link>
          </h4>
        ) : (
          <ListGroup variant='flush'>
            {products.map((product, index) => (
              <ListGroup.Item key={index}>
                <Row>
                  <Col md={2}>
                    <ImageHepler product={product} />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${product._id}`}>{product.name}</Link>
                  </Col>
                  <Col md={2}>${product.price}</Col>
                  
                  <Col md={1}>
                    <Button className="fa fa-minus fa-inverse fa-2x"></Button>
                    
                  </Col>

                  <Col md={1}>
                  <Button className="fa fa-plus fa-inverse fa-2x"></Button>
                  </Col>

                  <Col md={1}>
                  <Form.Group controlId='price'>
          <Form.Label>Price</Form.Label>
          <Form.Control
            type='number'
            placeholder='Enter price'
          ></Form.Control>
        </Form.Group>
                  </Col>

                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => {
                        removeItemFromCart(product._id);
                        setReload(!reload)}}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
          <StripeCheckout products={products} setReload={setReload} />
          </Col>
        </Row>
        </>
  );
};

export default Cart;
