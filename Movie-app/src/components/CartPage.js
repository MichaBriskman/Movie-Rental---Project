import {Alert, Button, Container} from "react-bootstrap";
import React, {useEffect, useState} from "react";

import MovieListCart from "./CartPageComponents/MovieListCart";
import CalculateTotalPrice from "./CartPageComponents/CalculateTotalPrice";
import ResetCartButton from "./CartPageComponents/ResetCartButton";
import {Link} from "react-router-dom";

/**
 * The cartPage contains the movie list in the cart, the total price, the resetButton and an option going to the checkoutPage/
 * @returns {JSX.Element} the cart page in jsx form.
 * @constructor
 */
const CartPage = () => {

    const API_KEY = "bcab1630c35a90686c6bcc28aa9d701b";
    const [moviesArr, setMoviesArr] = useState([]);
    const [movieIds, setMovieIds] = useState([]);
    const [error, setError] = useState({hasError : false, error : ""});

    function handleError(error) {
        setError({
            hasError: true,
            error: `${error.toString()}`}
        );
    }

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const moviePromises = movieIds.map((id) =>
                    fetch(
                        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
                    ).then((response) => response.json())
                );
                const movieResults = await Promise.all(moviePromises);
                setMoviesArr(movieResults);
            } catch (error) {
                handleError(error);
            }
        };

        fetchMovies();
    }, [movieIds]);


    useEffect(() => {
        fetch(`/cart/getCart`)
            .then(response => response.json())
            .then(data => setMovieIds(data))
            .catch(handleError)
    }, [])

return (
    <>
        {error.hasError && (<Alert variant="danger">{error.error}</Alert>)}
        <Container>
            {moviesArr.length > 0 ? (
                <>
                <MovieListCart setMovieIds={setMovieIds} moviesArr={moviesArr} handleError={handleError}/>
                   <div className="text-center">
                       <CalculateTotalPrice movieIds={movieIds} handleError={handleError}/>
                       <Link to="/checkout">
                           <Button>
                               Checkout
                           </Button>
                       </Link>
                       <span style={{ margin: "0 20px" }}></span>
                   <ResetCartButton setMovieIds={setMovieIds} handleError={handleError}/>
                   </div>
                </>
            ) : (
                <div className="text-center">
                    <h1>Empty cart</h1>
                </div>
            )}
            <br/>
    </Container>
        </>
)
};

export default CartPage;
