import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Movie from "../components/Movie";
import Pagination from "../components/Pagination";
import MovieContext from "../context/MovieContext";
import "./Browse.css" 
import useMediaQuery from '@mui/material/useMediaQuery';
import Navbar from "../components/Navbar";
import Modal from "../components/Modal";

function Browse() {
  // loading, searchTerm, search, movies, totalPages
  const matches = useMediaQuery('(max-width:400px)');

  const { currentPage, setCurrentPage,
    movies, setMovies,
    search, setSearch,
    searchTerm, setSearchTerm,
    loading, setLoading,
    totalPages, setTotalPages,
    getMovies } = useContext(MovieContext);
  const [filterActive, setFilterActive] = useState(false);
  const [year, setYear] = useState(1965);
  const [yearStyle, setYearStyle] = useState('');

  const toggleMenu = () => {
    document.body.classList.toggle('menu--open')
  }

  useEffect(() => {
    if(currentPage > 0) {
      if(filterActive) {
        getMovies(currentPage, year)
      } else {
        getMovies(currentPage);
      } 
    }
  }, [currentPage])

  const onSubmit = async () => {
    setCurrentPage(1);
    if(filterActive) {
      await getMovies(1, year)
    } else {
      await getMovies(1);
    }
  }

  useEffect(() => {
    if(!filterActive) {
      getMovies(1)
    }
  }, [filterActive])

  useEffect(() => {
    if(!matches) {
      setYearStyle(`${(((year - 1900) / 122) * 285) - 16}px`)
    } else {
      setYearStyle(`${(((year - 1900) / 122) * 185) - 16}px`)
    }
  }, [year, matches])

  return (
    
    <div className="browse">
      <div className="navbar">
        <div className="overlay"></div>
        <Navbar />
        <header>
          <h1 className="header__title">Browse our movies</h1>
          <div className="header__search--container">
            <input
              value={search}
              onKeyUp={(e) => {
                if(e.key === 'Enter') {
                  onSubmit();
                }
              }}
              onChange={(e) => {setSearch(e.target.value)}}
              type="text"
              className="header__search"
              placeholder="Search thousands of movies..."
            />
            <button
              onClick={onSubmit}
              type="submit"
              className="header__search--icon"
            >
              <i className="fa-solid fa-search"></i>
            </button>
          </div>
        </header>
      </div>
      <div className="main__top">
        <h2 className="main__top--title">
          Search results
          { searchTerm && (
            <> for <span className="search__term">"{searchTerm}"</span></>
          )}
        </h2>
        <div className="main__top--right">
          <div className="main__top--filter">
            <h2>Filter by year</h2>
            <label className="switch">
              <input 
                type="checkbox"
                checked={filterActive} 
                onChange={(e) => {setFilterActive(e.target.checked)}}
              />
              <span className="slider round"></span>
            </label>
          </div>
          <div style={{
            padding: !filterActive && 0,
            margin: !filterActive && 0,
            height: !filterActive && 0,
            width: !filterActive && 0,
            opacity: !filterActive && 0
          }} className="main__top--card">
            <div className="main__top--slider--wrapper">
              <div className="main__top--year" style={{
                left: yearStyle
              }}>
                {year}
              </div>
              <input 
                className="main__top--slider"
                type="range"
                value={year}
                onChange={(e) => {setYear(+e.target.value)}}
                min={1900}
                max={2022}
              />
            </div>
            <button onClick={onSubmit} className="main__top--apply">
              FILTER
            </button>
          </div>        
        </div>
      </div>
      <main>
        <div className="movie__list">
          {
            !loading ? (
              movies?.map(movie => {
                const {
                  Poster,
                  Title,
                  Type,
                  Year,
                  imdbID
                } = movie;
                return (
                  <Movie
                    movies={movies}
                    loading={loading}
                    Poster={Poster}
                    Title={Title}
                    Type={Type}
                    Year={Year}
                    imdbID={imdbID}
                    key={imdbID}
                  />
                )
              })
            ) : (
              new Array(10).fill(0).map((_, index) => {
                return <Movie
                  key={index}
                  movies={movies}
                  loading={loading}
                />
              })
            )
          }
        </div>
      </main>
      {
        (searchTerm && totalPages > 1) && (
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
          />
        )
      }
      <Modal />
    </div>
  )
}
export default Browse