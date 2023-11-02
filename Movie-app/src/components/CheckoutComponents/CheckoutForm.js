import React, {useState} from "react";
import {Button, Form} from "react-bootstrap";

/**
 * checkout component a form to register to the purchase database.
 * @param props 1. setError - setter. 2. price - total price of the cart. 3. setCheckoutCompleted - setter boolean.
 * 4. handleError - func.
 * @returns {JSX.Element} returns the form to register to the purchase database.
 * @constructor
 */
const CheckoutForm = (props) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    function handleResetCart() {
        fetch(`/cart/clearCart`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body :''
        })
            .then((response) => response.text())
            .then(data=>{})
            .catch(props.handleError);
    };
    function validateForm() {
        if (!firstName || !lastName || !email) {
            props.setError({
                hasError: true,
                error: `Field is required`}
            );
            return false;
        }
        return true;
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validateForm())
            return;
        const payment = props.price.toString();
        console.log(payment);

        const purchase = {
            firstName,
            lastName,
            email,
            payment,
        };

        fetch("/purchase/addPurchase", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(purchase),
        })
            .then((response) => response.json())
            .then((data) => {})
            .catch(props.handleError);
        props.setCheckoutCompleted(true);
        handleResetCart();
        props.setError({
            hasError: false,
            error: ``}
        );
    }
    return (
        <>
            <div className="text-center">
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="firstName">
                        <Form.Label>First Name:</Form.Label>
                        <Form.Control
                            type="text"
                            value={firstName}
                            placeholder={"enter a first name"}
                            onChange={(event) => setFirstName(event.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="lastName">
                        <Form.Label>Last Name:</Form.Label>
                        <Form.Control
                            type="text"
                            value={lastName}
                            placeholder={"enter a last name"}
                            onChange={(event) => setLastName(event.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="email">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            placeholder={"enter an email"}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </Form.Group>
                    <h4>Total price: {props.price}$</h4>
                    <Button variant="primary" type="submit">Checkout!</Button>
                </Form>
            </div>
        </>
    );
}

export default CheckoutForm;