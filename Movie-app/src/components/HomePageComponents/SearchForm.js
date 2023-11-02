import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, {useEffect, useState} from "react";
import Select from "react-select";
import { Form, Button} from "react-bootstrap";
import axios from "axios";

const API_KEY = "bcab1630c35a90686c6bcc28aa9d701b";
/**
 * Home page component the searching form
 * @param onSearch - onSearch={(query, genres, year) => {setSearchQuery(query), setSelectedGenres(genres), setSelectedYear(year);
 * @param loading - loading bool
 * @param setError - setter for error
 * @returns {JSX.Element} jsx format search form
 * @constructor
 */
const SearchForm = ({ onSearch, loading, setError }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [genreOptions, setGenreOptions] = useState([]);
    const [selectedYear, setSelectedYear] = useState(null);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
                );
                const genres = response.data.genres.map((genre) => ({
                    label: genre.name,
                    value: genre.id
                }));
                setGenreOptions(genres);
            } catch (error) {
                setError(error);
            }
        };
        fetchGenres();
    }, []);
    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (!searchQuery && selectedGenres.length === 0 && !selectedYear) {
            setError({hasError: true, error: `Field is required`});
            return;
        }
        setError({hasError: false, error: ``});
        onSearch(searchQuery, selectedGenres, selectedYear);
    };
    const handleGenreChange = (selectedOptions) => {
        setSelectedGenres(selectedOptions);
    };
    const handleYearChange = (selectedOption) => {
        setSelectedYear(selectedOption);
    };

    const generateYearOptions = () => {
        const currentYear = new Date().getFullYear();
        const yearOptions = [];

        for (let year = currentYear; year >= 1900; year--) {
            yearOptions.push({ value: year, label: year.toString() });
        }

        return yearOptions;
    };

    const yearOptions = [
        { value: null, label: "none" },
        ...generateYearOptions(),
    ];

    return (
        <Form onSubmit={handleFormSubmit}>
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="Enter search query"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            <Select
                options={yearOptions}
                placeholder="Select release year"
                value={selectedYear}
                onChange={handleYearChange}
            />
            <Select
                options={genreOptions}
                isMulti
                placeholder="Select genres"
                onChange={handleGenreChange}
            />
            </Form.Group>
            <Button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
            >
                search
            </Button>
        </Form>
    );
};

export default SearchForm;