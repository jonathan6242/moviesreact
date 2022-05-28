import { Link, useParams } from "react-router-dom"
import "./MoviePage.css"
import Navbar from "../components/Navbar";
import Modal from "../components/Modal";
import { useEffect, useState } from "react";
import axios from "axios";
import MovieSection from "../components/MovieSection";
import MovieFacts from "../components/MovieFacts";
import SkeletonImage from "../assets/Skeleton image.png"

function MoviePage() {
  const { id } = useParams();
  const [movie, setMovie] = useState('');
  const [loading, setLoading] = useState(true)
 
  const getMovie = async () => {
    const { data } = await axios.get(`https://www.omdbapi.com/?apikey=74514e3b&i=${id}`)
    setMovie(data);
    setTimeout(() => {
      setLoading(false);
    }, 500)
  }

  useEffect(() => {
    getMovie()
  }, [])

  const ratingColor = (rating) => {
    if(rating >= 70) {
      return '#66d42f'
    } else if(rating >= 40) {
      return '#F4D35E'
    } else if (rating >= 0) {
      return '#dd0000'
    } else {
      return '#242424'
    }
  }

  return (
    <div className="movie-page">
      <Navbar selected="browse" />
      <div className="movie-page__main">
        <div className="movie-page__main--top">
          <Link to='/browse'>
            <h2>
              <i className="fa-solid fa-arrow-left"></i> Movies
            </h2>
          </Link>
        </div>
        {
          !loading && (
            <div className="movie__selected">
              <figure className="movie__selected--img">
                <img 
                  src={movie.Poster}
                  alt={movie.Title}
                />
              </figure>
              <div className="movie__selected--description">
                <h1 className="movie__selected--title">
                  {movie.Title}
                </h1>
                <div className="movie__selected--facts">
                  <div className="movie__selected--rated">
                    {movie.Rated}
                  </div>
                  <MovieFacts facts={[movie.Released, movie.Genre, movie.Runtime]} />
                </div>
                <div className="movie__selected--rating--wrapper">
                  <div className="movie__selected--metascore">
                    <div className="movie__selected--metascore--inner">
                      {movie.Metascore}
                    </div>
                    <div className="movie__selected--metascore--percent" style={{
                      background: 
                        `${
                          movie.Metascore ? 
                          `conic-gradient(${ratingColor(movie.Metascore)} 0deg, 
                          ${ratingColor(movie.Metascore)} ${-5 + (+movie.Metascore / 100) * 360}deg, 
                          #555 ${5 + (+movie.Metascore / 100) * 360}deg)` :
                          '#242424'
                        }`
                    }}></div>
                    
                  </div>
                  <div className="movie__selected--metascore--title">
                    Metascore
                  </div>
                  <div className="movie__selected--ratings">
                    {
                      movie?.Ratings?.map((rating, index) => (
                        <div key={index} className="movie__selected--rating">
                          <div className="movie__selected--value">
                            {rating.Value}
                          </div>
                          <div className="movie__selected--source">
                            {
                              rating.Source.toLowerCase() === 'internet movie database' ?
                              'IMDb' : rating.Source
                            }
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>
                <MovieSection 
                  title="Overview"
                  value={movie.Plot}
                />
                <MovieSection 
                  title="Cast"
                  value={movie.Actors}
                />
                <MovieSection 
                  title="Director"
                  value={movie.Director}
                />
                <MovieSection 
                  title="Writers"
                  value={movie.Writer}
                />
                <MovieSection 
                  title="Box Office"
                  value={movie.BoxOffice}
                />
              </div>
            </div>
          )
        }
        {
          loading && (
            <div className="movie__selected">
              <figure className="movie__selected--img skeleton">
                <img 
                  src={SkeletonImage}
                />
              </figure>
              <div className="movie__selected--description">
                <h1 className="movie__selected--title skeleton">
                  Fast & Furious 6
                </h1>
                <div className="movie__selected--facts skeleton">
                  <div className="movie__selected--rated">PG-13</div>
                  <MovieFacts facts={["24 May 2013", "Action, Crime, Thriller", "130 min"]} />
                </div>
                <div className="movie__selected--rating--wrapper">
                  <div className="movie__selected--metascore skeleton"></div>
                  <div className="movie__selected--ratings skeleton">
                    <div className="movie__selected--rating">
                      <div className="movie__selected--value">
                        7.0/10
                      </div>
                      <div className="movie__selected--source">
                        IMDb
                      </div>
                    </div>
                    <div className="movie__selected--rating">
                      <div className="movie__selected--value">
                        71%
                      </div>
                      <div className="movie__selected--source">
                        Rotten Tomatoes
                      </div>
                    </div>
                    <div className="movie__selected--rating">
                      <div className="movie__selected--value">
                        61/100
                      </div>
                      <div className="movie__selected--source">
                        Metacritic
                      </div>
                    </div>
                  </div>
                </div>
                <MovieSection 
                  title="Overview"
                  value="Hobbs has Dominic and Brian reassemble their crew to take down a team of mercenaries: Dominic unexpectedly gets sidetracked with facing his presumed deceased girlfriend, Letty."
                  skeleton
                />
                <MovieSection 
                  title="Cast"
                  value="Vin Diesel, Paul Walker, Dwayne Johnson"
                  skeleton
                />
                <MovieSection 
                  title="Director"
                  value="Justin Lin"
                  skeleton
                />
                <MovieSection 
                  title="Writers"
                  value="Chris Morgan, Gary Scott Thompson"
                  skeleton
                />
                <MovieSection 
                  title="Box Office"
                  value="$238,679,850"
                  skeleton
                />
              </div>
            </div>
          )
        }
      </div>
      <Modal />

    </div>
  )
}
export default MoviePage