import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../compenents/MovieCard";

const searchURL = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;

import "./MovieGrid.css"

const Search =() => {
    const [SearchParams] = useSearchParams();

    const [movies, setMovies] = useState ([]);
    const query = SearchParams.get("q");

    const getSearchMovies = async (url) => {

        const res = await fetch(url);
        const data = await res.json();

        setMovies(data.results);
    };

    useEffect(() => {
        const searchWithQUeryURL = `${searchURL}?${apiKey}&query=${query}`;

       getSearchMovies(searchWithQUeryURL);
    }, [query]);
    
    return (
        <div className="container">
          <h2 className="title">
            Resultados para: <span className="query-text">{query}</span>
          </h2>
          <div className="movies-container">
            {movies.length === 0 && <p>Carregando...</p>}
            {movies.length > 0 &&
              movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
          </div>
        </div>
    )
};

export default Search;