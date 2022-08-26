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
      const {data} = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=f597dd07c92aefb370ba6c34bd04ad5a&include_adult=false&query=${search}&page=${page}${year ? `&primary_release_year=${year}` : ''}`);
      // console.log(data);
      // const response = await axios.get(`https://www.omdbapi.com/?i=tt3896198&apikey=74514e3b&s=${search}&page=${page}${year ? `&y=${year}` : ''}`);
      // setTotalPages(Math.ceil(response.data.totalResults / 10))
      setTotalPages(data.total_pages)
      // let movies = response.data.Search;
      let movies = data.results.slice(0, 8);
      if(movies?.length > 0) {
        // let i;
        // for(i = 0; i < movies.length; i++) {
        //   for(let j = i + 1; j < movies.length; j++) {
        //     if(movies[i].id === movies[j].id){
        //       movies = movies.filter((_, index) => index !== i);
        //     }
        //   }
        // }
        // console.log(movies);
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