import {useState, useEffect} from "react";

const PRICE = 3.99;
/**
 * cart component calculating the total price of the cart
 * @param props 1. movieIds - array, 2. handleError - func
 * @returns {JSX.Element} total price
 */
const CalculateTotalPrice = (props) => {
    const [price, setPrice] = useState(0.0);

    useEffect(() => {
        fetch(`/cart/getCart`)
            .then(response => response.json())
            .then(cart => setPrice(cart.length * PRICE))
            .catch(props.handleError)
    }, [props.movieIds])

    return(
            <h4>Total Price: {price}$</h4>
    );
}

export default CalculateTotalPrice;