import {Alert} from "react-bootstrap";
import React, {Fragment, useEffect, useState} from "react";
import CheckOutForm from "./CheckoutComponents/CheckoutForm";

const PRICE = 3.99;
/**
 * The checkout page contains a form to register to the purchase database, and a total price.
 * @returns {JSX.Element} the checkout page in jsx form.
 * @constructor
 */
const CheckoutPage = () => {
    const [totalPrice, setTotalPrice] = useState(0);
    const [error, setError] = useState({hasError : false, error : ""});
    const [checkoutCompleted, setCheckoutCompleted] = useState(false);

    function handleError(error) {
        setError({
            hasError: true,
            error: `${error.toString()}`}
        );
    }

    useEffect(() => {
        fetch(`/cart/getCart`)
            .then(response => response.json())
            .then(cart => setTotalPrice(cart.length*PRICE))
    }, [])

    return (
        <Fragment>
            {totalPrice === 0 ? (
                <div className="text-center">
                    <h1>Empty cart</h1>
                </div>
            ) : (
                !checkoutCompleted ?
                        (<CheckOutForm setError={setError} price={totalPrice} setCheckoutCompleted={setCheckoutCompleted}
                        handleError={handleError}/>) :
                        <div className="text-center"><h1>Purchase completed!</h1></div>
                )}
            {error.hasError && (<Alert variant="danger">{error.error}</Alert>)}
            </Fragment>
    )
};

export default CheckoutPage;