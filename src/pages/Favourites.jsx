import Pagination from "../components/Pagination";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Modal from "../components/Modal"
import Movie from "../components/Movie";
import Navbar from "../components/Navbar"
import MovieContext from "../context/MovieContext";
import "./Favourites.css"

function Favourites() {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pages, setPages] = useState('');
  const [page, setPage] = useState(1);

  async function getFavourites(page) {
    if(!JSON.parse(localStorage.getItem("favourites"))) {
      return;
    }
    setLoading(true);
    let arr = [];
    const favouriteIDs = JSON.parse(localStorage.getItem("favourites")).reverse();
    const totalPages = Math.ceil(favouriteIDs.length / 6)
    setPages(totalPages);
    const currentPageIDs = favouriteIDs.slice(0 + 6 * (page - 1), 6 + 6 * (page - 1));
    for(let id of currentPageIDs) {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=f597dd07c92aefb370ba6c34bd04ad5a`)
      const movie = response.data;
      arr.push(movie);
    }
    setFavourites(arr);
    setTimeout(() => {
      setLoading(false);
    }, 200)
  }
  
  useEffect(() => {
    getFavourites(1);
  }, [])

  
  useEffect(() => {
    if(page > 0) {
      getFavourites(page)
    }
  }, [page])

  return (
    <div className="favourites">
      <Navbar selected="favourites"/>
      <div className="main__top">
        <div className="main__top--title">Favourites</div>
      </div>
      <main>
        <div className="movie__list">
        {
            !loading ? (
              favourites?.map(movie => {
                const {
                  poster_path,
                  original_title,
                  release_date,
                  original_language,
                  // Title,
                  // Type,
                  // Year,
                  id
                } = movie;
                return (
                  <Movie
                    movies={favourites}
                    loading={loading}
                    poster_path={poster_path}
                    original_title={original_title}
                    release_date={release_date}
                    original_language={original_language}
                    // Title={Title}
                    // Type={Type}
                    // Year={Year}
                    id={id}
                    key={id}
                  />
                )
              })
            ) : (
              new Array(6).fill(0).map((_, index) => {
                return <Movie
                  key={index}
                  movies={favourites}
                  loading={loading}
                />
              })
            )
          }
        </div>
      </main>
      {
        (pages > 1) && (
          <Pagination 
            currentPage={page}
            totalPages={pages}
            setCurrentPage={setPage}
          />
        )
      }
 
      <Modal />
    </div>
  )
}
export default Favourites