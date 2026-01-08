import PropTypes from 'prop-types';
import { useState } from 'react';


function Products(props) {

    const [ purchased , setPurchased ] = useState(false);
    const [ discount , setDiscount ] =useState(props.price);
    function ApplyDiscounts(amt) {
        setDiscount(props.price - amt);
    }

    function BuyProducts(){
        alert(`You have bought ${props.name} for $${props.price} with 20$ discount!`);
        setPurchased(true);
    }

// 
    return (
        <div className="card">
            <img src={props.img} alt="" />
            <h3>{props.name}</h3>
            <p>{discount}</p>
            <button className="btn1" onClick={() => {ApplyDiscounts(20)}}>Discount</button>
            <button className="btn2" onClick={() => {BuyProducts()}}>Buy Now</button>
            <button className="delete" onClick={() => props.delete(props.id)}>Delete</button>
            <p className="status">{purchased ? "Already Purchased" : "Get it now"}</p>
            

        </div>
    );
}

Products.propTypes = {
    img: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
};

export default Products;