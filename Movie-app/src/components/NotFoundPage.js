import {Button, Container} from 'react-bootstrap';
import {Link} from "react-router-dom";
import React from "react";

/**
 * not found page
 * @returns {JSX.Element} not found page in jsx format
 * @constructor
 */
const NotFoundPage = () => {
    return (
       <Container>
           <div className="text-center">
            <h1>Page Not Found 404</h1>
           <Link to="/">
               <Button>
                   HomePage
               </Button>
           </Link>
           </div>
       </Container>
    )
};

export default NotFoundPage;