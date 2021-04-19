
import React,{useState,useEffect} from 'react'
import Base from './Base';


import Card from './Card';
import { removeItemFromCart } from './helper/CartHelper';
import { getProductsById } from './helper/coreapicalls';


const ProductDetail=({match})=>{
  const [product, setproduct] = useState("");
  const [error,seterror]=useState("");


const preload = (productId) => {
    getProductsById(productId).then(data=>{
        console.log(data);
        

        if(data.error)
        {
            seterror(data.error)
        }
        else
        {
          setproduct(data)
          console.log(product)
        }
    })
}

useEffect(() => {
    preload(match.params.productId);
  }, []);


return (
          <div   className="col-4 mb-4">
            <Card product={product} addtoCart="false"></Card>
          </div>
)
}  
export default ProductDetail;