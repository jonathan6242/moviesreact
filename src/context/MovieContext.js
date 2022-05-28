import axios from "axios";
import { createContext, useState } from "react";

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('')
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false)
  const [totalPages, setTotalPages] = useState('');

  async function getMovies(page, year) {
    if(loading) {
      return;
    }
    setSearchTerm(search);
    if(search !== '') {
      setLoading(true)
      const response = await axios.get(`https://www.omdbapi.com/?i=tt3896198&apikey=74514e3b&s=${search}&page=${page}${year ? `&y=${year}` : ''}`);
      setTotalPages(Math.ceil(response.data.totalResults / 10))
      let movies = response.data.Search;
      if(movies?.length > 0) {
        let i;
        for(i = 0; i < movies.length; i++) {
          for(let j = i + 1; j < movies.length; j++) {
            if(movies[i].imdbID === movies[j].imdbID){
              movies = movies.filter((_, index) => index !== i);
            }
          }
        }
        setMovies(movies)
      } else {
        setMovies([]);
      }

      setLoading(false)
    } else {
      setMovies([]);
      setLoading(false)
    }
  }

  return (
    <MovieContext.Provider value={{
      currentPage, setCurrentPage,
      movies, setMovies,
      search, setSearch,
      searchTerm, setSearchTerm,
      loading, setLoading,
      totalPages, setTotalPages,
      getMovies
    }}>
      {children}
    </MovieContext.Provider>
  )
}

export default MovieContext;