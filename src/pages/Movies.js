
import { useState } from "react";
import { useEffect } from "react";

// CSS
import "./Movies.css"

import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { AuthValue } from "../context/AuthContext";


const imageUrl = "https://image.tmdb.org/t/p/w500/";
const urlMovie = "https://api.themoviedb.org/3/movie/";
const apiKey = process.env.REACT_APP_API_KEY;
const concatUrl = `${urlMovie}popular?${apiKey}`;


const Movies = () => {
  const {data, loading, error } = useFetch(concatUrl);
  const [topMovies, setTopMovies] = useState([]);
  const { loggedUser } = AuthValue();
  
  useEffect(() => {
    if (data && data.results) {
      setTopMovies(data.results);
    }
  }, [data]);


  return (
    <div>
      <h1 className="title-page">Popular movies {loggedUser}</h1>
      
      <div className="container">
        {loading && <p>Carregando...</p>}
        {error && <p>Carregando...</p>}

        <div className="row">
          {topMovies.map(topMovies => (
            <div key={topMovies.id} className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-2 all-content-movie">
              <figure>
                <img src={`${imageUrl + topMovies.poster_path}`} alt={topMovies.original_title} title={topMovies.original_title} ></img>
              </figure>
              <div className="infos-movie">
                <h2 className="movie-title mt-2 fw-bold">{topMovies.original_title}</h2>
                <span className="vote-average">Vote Average: {topMovies.vote_average}</span>
              </div>
              <Link to={`/movie-details/${topMovies.id}`}>Details</Link>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default Movies