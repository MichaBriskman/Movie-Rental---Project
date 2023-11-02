import {Button} from "react-bootstrap";
import {Link, Outlet} from "react-router-dom";
import React from "react";

/**
 * MenuBar component for navigating between the 3 pages homePage, carPage, CheckoutPAge
 * @returns {JSX.Element} the navbar.
 * @constructor
 */
const Navbar = () => {
    return (
        <>
        <nav className="text-center">
            <h1>Micha's Movie Rental Store</h1>
            <Link to="/">
                <Button>
                    HomePage
                </Button>
            </Link>
            <span style={{ margin: "0 20px" }}>
            <Link to="/cart">
                <Button>
                    Cart
                </Button>
            </Link>
            </span>
            <span style={{ margin: "0 10px" }}>
            <Link to="/checkout">
                <Button>
                    Checkout
                </Button>
                </Link>
            </span>
        </nav>
            <br/>
            <Outlet/>
        </>
    );
};


export default Navbar;