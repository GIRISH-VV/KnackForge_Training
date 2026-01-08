import './App.css'
import Products from './Products'
import HeadPhone from './assets/HeadPhone.jpg'    
import Glass from './assets/Glass.jpg'    
import Shoe from './assets/Shoe.jpg'    
import Watch from './assets/Watch.jpg'
import { useState } from 'react'

const ProductList = () => {
    const [productss,setProductss]= useState ([
    {
        id: 1,
        name: 'HeadPhone',
        price: 299,
        img: HeadPhone
    },
    {
        id: 2,
        name: 'Glass',
        price: 199,
        img: Glass
    },
    {
        id: 3,
        name: 'Shoe',
        price: 499,
        img: Shoe
    },
    {
        id: 4,
        name: 'Watch',
        price: 999,
        img: Watch
    }
]);
    function deleteProduct(id){
        const updatedProducts = productss.filter((prod) => prod.id !== id);
        setProductss (updatedProducts);
    }



    productss.sort((x,y) => x.price - y.price);
    return (
    <>
     {productss.map((prod) => (
      <Products
        key={prod.id}
        id={prod.id}
        name={prod.name}
        price={prod.price}
        img={prod.img}
        delete={deleteProduct}
      />
    ))}
  </>
)
}


export default ProductList;