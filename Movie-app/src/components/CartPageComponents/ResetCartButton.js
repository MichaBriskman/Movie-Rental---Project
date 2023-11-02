import {Button} from "react-bootstrap";

/**
 * Cart component reset cart button
 * @param props 1. handleError - func. 2.setMovieIds - setter.
 * @returns {JSX.Element} returns the button to reset the cart.
 * @constructor
 */
const ResetCartButton = (props) => {
    function handleResetCart() {
        fetch(`/cart/clearCart`,{
            method: 'POST',
                headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : ''
        })
            .then((response) => response.text())
            .then(data=>{props.setMovieIds([])})
            .catch(props.handleError);
    }

    return(
        <Button
        className="btn btn-danger"
        onClick={handleResetCart}>
            reset cart
        </Button>
    );
}

export default ResetCartButton;