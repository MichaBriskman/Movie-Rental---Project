import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, { useState, useEffect } from "react";
import {Alert} from "react-bootstrap";
import axios from "axios";
import SearchForm from "./HomePageComponents/SearchForm";
import Results from "./HomePageComponents/Results";
import BrowseMoviePages from "./HomePageComponents/BrowseMoviePages";
import HistorySearch from "./HomePageComponents/HistorySearch";
import ModalAddedToCart from "./HomePageComponents/ModalAddedToCart";

const API_KEY = "bcab1630c35a90686c6bcc28aa9d701b";
const QUERY_TYPE = '0';
const GENRE_TYPE = '1';
const YEAR_TYPE = '2';
const GENRE_AND_YEAR_TYPE = '3';

/**
 * The homepage contains a search form to search in the IMDB api, the movie list results of promises, history search of
 * the form, an option to add to cart, a modal that pops when added to cart, and an option to browse more pages of the
 * searched movies.
 * @returns {JSX.Element} homepage in jsx format
 * @constructor
 */
const HomePage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [selectedYear, setSelectedYear] = useState(null);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({hasError : false, error : ""});
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [shownResults, setShownResults] = useState(false);
    const [searchHistoryArr, setSearchHistoryArr] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [numberOfItems, setNumberOfItems] = useState(0);
    function handleError(error) {
        setError({
            hasError: true,
            error: `${error.toString()}`}
        );
    }
    const handleSearch = async (page = 1, apiUrlParam = "") => {
        try {
            let apiUrl = "";
            setLoading(true);
            setShownResults(false);
            if(apiUrlParam === "") {
                const genreIds = selectedGenres.map((genre) => genre.value).join(",");
                const genreLabels = selectedGenres.map((genre) => genre.label).join(",");
                apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&include_adult=false&page=${page}`;
                let searchType = {typeSearch: '', value: '', ids: ''};

                if (searchQuery) {
                    apiUrl = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&include_adult=false&page=${page}&query=${searchQuery}`;
                    searchType.typeSearch = QUERY_TYPE;
                    searchType.value = searchQuery;
                }
                else {
                    if (genreIds) {
                        apiUrl += `&with_genres=${genreIds}`;
                        searchType.typeSearch = GENRE_TYPE;
                        searchType.value = genreLabels;
                        searchType.ids = genreIds;
                    }

                    if (selectedYear && selectedYear.value !== null) {
                        apiUrl += `&primary_release_year=${selectedYear.value}`;
                        if (searchType.typeSearch === GENRE_TYPE) {
                            searchType.typeSearch = GENRE_AND_YEAR_TYPE;
                            searchType.value += ',' + selectedYear.value;
                            searchType.ids += '?' + selectedYear.value;
                        } else {
                            searchType.typeSearch = YEAR_TYPE;
                            searchType.value = selectedYear.value;
                        }
                    }

                    if (apiUrl === `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&include_adult=false&page=1`) {
                        setError({hasError: true, error: `Field is required`});
                        setShownResults(false);
                        return;
                    }
                }
                if(page===1)
                    setSearchHistoryArr([searchType, ...searchHistoryArr]);
            }
            setError({hasError: false, error: ``});
            setShownResults(true);
            if(apiUrlParam === "")
               await getResponse(apiUrl, page);
            else
                await getResponse(apiUrlParam, page);
        } catch (error) {
            handleError(error);
        } finally {
            setLoading(false);
        }
    };
    async function getResponse(apiUrl, page) {
        const response = await axios.get(apiUrl);
        setResults(response.data.results);
        setTotalPages(response.data.total_pages);
        setCurrentPage(page);
    }
    function searchByHistory(search) {
        try {
            let apiUrl = "";
            switch (search.typeSearch) {
                case QUERY_TYPE:
                    apiUrl = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&include_adult=false&page=${1}&query=${search.value}`;
                    break;
                case GENRE_TYPE:
                    apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&include_adult=false&page=${1}&with_genres=${search.ids}`;
                    break;
                case YEAR_TYPE:
                    apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&include_adult=false&page=${1}&primary_release_year=${search.value}`;
                    break;
                case GENRE_AND_YEAR_TYPE:
                    let types = search.ids.split('?');
                    apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&include_adult=false&page=${1}&with_genres=${types[0]}&primary_release_year=${types[1]}`;
                    break;
                default:
                    break;
            }
            handleSearch(1, apiUrl)
                .then(res=>{})
                .catch(handleError);
        }
        catch(error) {
            handleError(error);
        }
    }

    useEffect(() => {
        if (searchQuery || selectedGenres.length > 0 || selectedYear) {
            handleSearch()
                .then(res=>{})
                .catch(handleError);
        }
    }, [searchQuery, selectedGenres, selectedYear]);

    useEffect(() => {
        fetch(`/cart/getCart`)
            .then(response => response.json())
            .then(data => setNumberOfItems(data.length))
            .catch(handleError);
    }, [])

    function addMovieToCart(id)
    {
        fetch('/cart/addMovie', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `movieId=${id}`,
        })
            .then(response => response.json())
            .then(data => {
                setNumberOfItems(data.length);
                setShowModal(true)})
            .catch(handleError);
    }

    return (
        <div className="text-center">
            <ModalAddedToCart showModal={showModal} setShowModal={setShowModal}/>
            <h3>Number of items in the cart: {numberOfItems}</h3>
            <HistorySearch searchHistoryArr={searchHistoryArr} searchByHistory={searchByHistory} setSearchHisoryArr={setSearchHistoryArr}/>
            <SearchForm
                onSearch={(query, genres, year) => {
                    setSearchQuery(query);
                    setSelectedGenres(genres);
                    setSelectedYear(year);
                }}
                loading={loading}
                setError={setError}
            />
            {error.hasError && (<Alert variant="danger">{error.error}</Alert>)}

            <Results results={results} loading={loading} addItemToCart={addMovieToCart}/>
            {shownResults && (
                <BrowseMoviePages
                    handleSearch={handleSearch}
                    totalPages={totalPages}
                    currentPage={currentPage}
                />
            )}
            <br/>
        </div>
    );
};

export default HomePage;