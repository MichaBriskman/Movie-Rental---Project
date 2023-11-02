import {Button} from "react-bootstrap";
import {useState} from "react";

/**
 * Home page component, returns the search history section.
 * @param props searchHistoryArr - 1. array of the history search. 2. searchByHistory - func. 3. setSearchHisoryArr - setter
 * @returns {JSX.Element} the list of the history search.
 * @constructor
 */
const HistorySearch = (props) => {
    const [showHistory, setShowHistory] = useState(false);
    const handleToggleHistory = () => {
        setShowHistory(!showHistory);
    };
    const handleItemClick = (search) => {
        props.searchByHistory(search);
    };
    const handleEmptyHistory = () => {
        props.setSearchHisoryArr([]);
    };
    const listStyle = {
        display: 'flex',
        justifyContent: 'center',
    };

    return (
        <>
        <Button className="btn btn-secondary" onClick={handleToggleHistory}>
            {showHistory ? 'hide history search' : 'show history search'}
        </Button>
            <span style={{ margin: "0 20px" }}></span>
        <Button className="btn btn-danger" onClick={handleEmptyHistory}>
                Empty History
        </Button>
        {showHistory && (
            <div style={listStyle}>
                <ol>
                {props.searchHistoryArr.map((item, index) => (
                    <li key={index}>
                    <a key={index}
                        href="/#"
                       className="d-block"
                       onClick={() => handleItemClick(item)}
                    >
                        {item.value}
                    </a>
                    </li>
                ))}
                </ol>
            </div>
        )}
            <br/>
            <br/>
        </>
    )
}

export default HistorySearch;