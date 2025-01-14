import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";

// CSS
import "./MovieCastDetails.css"

// Fallback
import noImage from "../assets/img/no-image.jpg";

// Hooks
import { useFetch } from "../hooks/useFetch";

const imageUrl = "https://image.tmdb.org/t/p/w500";
const urlMovie = "https://api.themoviedb.org/3/movie/";
const apiKey = process.env.REACT_APP_API_KEY;


const MovieCastDetails = () => {
  // Trazendo o ID do filme clicado anteriormente
  const { id } = useParams();
  const concatUrl = `${urlMovie}${id}popular?${apiKey}&append_to_response=videos,images,credits`;
  const {data, loading, error} = useFetch(concatUrl);

  const [movieDetail, setMovieDetail] = useState([]);
  const [creditsMovie, setCreditsMovie] = useState([]);
 
  useEffect(() => {
    if(data) {
      setMovieDetail(data);
      setCreditsMovie(data.credits);
    }
  }, [data]);


  return (
    <section className="single-movies-cast">
      
      <div className="bg-top-area">
        <div className="container">
          <div className="row">
            <div className="col-md-12 top-area-cast">
              <img className="img-movie-cast" src={`${imageUrl + movieDetail.poster_path}`} alt={movieDetail.original_title} title={movieDetail.original_title}></img>
              <h1 className="title-movie-cast-page text-white">
                {movieDetail.title}
                <span>({movieDetail.release_date})</span>
              </h1>
            </div>
          </div>
        </div>
      </div>
      
      <div className="box-cast-crew">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="infos-top-cast">
                <h2 className="title-section fw-bold">Main cast</h2>
              </div>
            
              <div className="row">
                {creditsMovie.cast && creditsMovie.cast.map((actor) => (
                  <div className="col-md-2" key={actor.id}>
                    <div className="card-box-cast">
                      <figure>
                        {(actor.profile_path) ?
                          <img className="img-movie" src={`${imageUrl + actor.profile_path}`} alt={actor.original_title} title={actor.original_title}></img>
                          :
                          <img src={noImage} alt={actor.original_title} title={actor.original_title} />
                        }                     
                      </figure>
                      <div className="personal-infos">
                        <h3 className="title-person">{actor.name}</h3>
                        <span className="title-character ">{actor.character}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>

    </section>
  )
}

export default MovieCastDetails