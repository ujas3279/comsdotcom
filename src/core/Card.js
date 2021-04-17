import React, {useState,useEffect, Fragment} from 'react'
import { Redirect } from 'react-router';
import { addItemToCart, removeItemFromCart } from './helper/CartHelper';
import ImageHepler from './helper/ImageHepler';
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import {ListGroup, Button } from 'react-bootstrap'


const Pcard = ({
    product,
    addtoCart = true,
    removeFromCart = false,
    setReload = f => f,
    //   function(f){return f}
    reload = undefined
  }) => {
    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count);
    
    
  
    const cartTitle = product ? product.name : "A photo from pexels";
    const cartDescrption = product ? product.description : "Default description";
    const cartPrice = product ? product.price : "DEFAULT";
  
    const addToCart = () => {
      addItemToCart(product, () => setRedirect(true));
    };
  
    const getARedirect = redirect => {
      if (redirect) {
        return <Redirect to="/cart" />;
      }
    };
  
    const showAddToCart = addtoCart => {
      return (
        addtoCart && (
                    <Button
                      onClick={addToCart}
                      className='btn-block'
                      type='button'
                    >
                      Add To Cart
                    </Button>
                  
        )
      );
    };
  
    const showRemoveFromCart = removeFromCart => {
      return (
        removeFromCart && (
          <button
            onClick={() => {
              removeItemFromCart(product._id);
              setReload(!reload);
            }}
            className="btn btn-block btn-outline-danger mt-2 mb-2"
          >
            Remove from cart
          </button>
        )
      );
    };

   

    return (
      <Card className='my-3 p-3 rounded'>
          {getARedirect(redirect)}
          <ImageHepler product={product} />

        <Card.Body>
            <Card.Title as='h3'>
              <strong>{cartTitle}</strong>
            </Card.Title>
            <Card.Text as='div'>{cartDescrption}</Card.Text>

          <Card.Text as='h3'><i class="fa fa-inr"></i>{cartPrice}</Card.Text>      
          
          {addtoCart && (
            <Button onClick={addToCart} className='btn-block' type='button'>
              Add to Cart
            </Button>
          )}

          {removeFromCart && (
            <Button onClick={() => {
              removeItemFromCart(product._id);
              setReload(!reload)}} variant="light" type='button'>
                <i className='fas fa-trash'></i>
            </Button>
          )}
          
        </Card.Body>
      </Card>
    );
  };
  
  export default Pcard;
