import {BrowserRouter, Route, Routes} from "react-router-dom";
import NavBar from "./MenuBar/NavBar";
import HomePage from "./HomePage";
import CartPage from "./CartPage";
import NotFoundPage from "./NotFoundPage";
import CheckoutPage from "./CheckoutPage";

/**
 * the routers of the program
 * @returns {JSX.Element} the routers in jsx format
 * @constructor
 */
const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<NavBar />}>
                    <Route index element={<HomePage />} />
                    <Route path="cart" element={<CartPage />} />
                    <Route path="checkout" element={<CheckoutPage />} />
                </Route>
                <Route path={"*"} element={<NotFoundPage/>} />
            </Routes>
        </BrowserRouter>
    )
};

export default Router;