import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, {Fragment} from "react";
import {Card, Spinner, Button, Container, Row, Col} from "react-bootstrap";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w200";
/**
 * Home page component returns the list of the movies.
 * @param props results array of the movie results. loading - boolean. addItemToCart - func
 * @returns {JSX.Element} returns the movie list 3 movies in a row, each movie in a card.
 * @constructor
 */
const SearchResults = (props) => {

    return (
       <Fragment>
            {props.loading ? (
                <Spinner animation="border" role="status">
                    <span className="sr-only"></span>
                </Spinner>
            ) : (
                <Container className="container-fluid">
                    <Row className="mt-4">
                        {props.results.map((result, index) => (
                            result.poster_path && (
                                <Col key={result.id} md={4} className="text-center mb-4">
                                    <Card key={result.id}>
                                        <Card.Img
                                            variant="top"
                                            src={`${IMAGE_BASE_URL}/${result.poster_path}`}
                                            alt={result.title || result.name}
                                            height={350}
                                        />
                                        <Card.Body>
                                            <Card.Title>{result.title || result.name}</Card.Title>
                                            <Card.Text>
                                                {result.overview && (
                                                    result.overview.substring(0, 150)
                                                )}...
                                            </Card.Text>
                                            <Button
                                                onClick={()=>props.addItemToCart(result.id)}>
                                                Add to Cart
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </Col>)
                        ))}
                    </Row>
                </Container>
            )}
       </Fragment>
    );
};

export default SearchResults;