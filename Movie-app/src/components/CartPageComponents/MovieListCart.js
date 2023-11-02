import {Button, Card, Col, Container, Row} from "react-bootstrap";
import React from "react";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w200";
const PRICE = "3.99$";
/**
 * cart component returns the movie items in the cart in jsx element.
 * @param props 1. setMovieIds - setter for movieIds. 2. movieArr - array of all the promises of the movies.
 * 3. handleError - func.
 * @returns {JSX.Element}  the movie list in jsx format.
 * @constructor
 */
const MovieListCart = (props) =>{
    const handleRemoveMovie = (id) => {
        fetch(`/cart/removeMovie`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `movieId=${id}`,
        })
            .then(r => r.json())
            .then(data => {props.setMovieIds(data)})
            .catch(props.handleError)
    };

    return (
        <Container className="container-fluid">
            <Row>
                {props.moviesArr.map((result) => (
                    result.poster_path && (
                        <Col key={result.id} md={4} className="text-center mb-4">
                            <Card key={result.id}>
                                <Card.Img
                                    variant="top"
                                    src={`${IMAGE_BASE_URL}/${result.poster_path}`}
                                    alt={result.title || result.name}
                                    width={125}
                                    height={350}
                                />
                                <Card.Body>
                                    <Card.Title>{result.title || result.name}</Card.Title>
                                    <Card.Text>
                                        <b>{result.release_date}</b>
                                    </Card.Text>
                                    <Card.Text>
                                        <b>{PRICE}</b>
                                    </Card.Text>
                                    <Button
                                        className="btn btn-danger"
                                        onClick={() => handleRemoveMovie(result.id)}
                                    >
                                        Remove from Cart
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>)
                ))}
            </Row>
        </Container>
    )
}

export default MovieListCart;