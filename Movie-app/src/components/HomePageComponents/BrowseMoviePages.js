import {Button} from "react-bootstrap";
import React from "react";

/**
 * home page component, moving forward and backward in the movie list.
 * @param props handleSearch - func. 2. totalPages - has the total pages of the movie list. 3. currentPage - current page.
 * @returns {JSX.Element} the jsx section of the navigation of the pages.
 * @constructor
 */
const BrowseMoviePages = (props) => {
    const handlePageChange = (page) => {
        if (page >= 1 && page <= props.totalPages) {
            props.handleSearch(page);
        }
    };

    const handleNextPage = () => {
        handlePageChange(props.currentPage + 1);
    };

    const handlePreviousPage = () => {
        handlePageChange(props.currentPage - 1);
    };
    return(
        <div>
            <Button onClick={handlePreviousPage} disabled={props.currentPage === 1}>
                Previous
            </Button>
            <span style={{ margin: "0 20px" }}><b>{props.currentPage}</b></span>
            <Button onClick={handleNextPage} disabled={props.currentPage === props.totalPages}>
                Next
            </Button>
        </div>
    )
}
export default BrowseMoviePages;