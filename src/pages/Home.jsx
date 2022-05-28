import { Link, useNavigate } from "react-router-dom"
import "./Home.css"
import HeaderImage from "../assets/undraw_explore_re_8l4v.svg"
import { useContext, useEffect } from "react"
import MovieContext from "../context/MovieContext"
import Navbar from "../components/Navbar"

function Home() {
  const navigate = useNavigate()
  const toggleMenu = () => {
    document.body.classList.toggle('menu--open')
  }

  const { 
    setCurrentPage,
    setMovies,
    search, setSearch,
    setSearchTerm,
    loading, setLoading,
    setTotalPages,
    getMovies
  } = useContext(MovieContext);
  
  useEffect(() => {
    setCurrentPage(0);
    setMovies([]);
    setSearch('');
    setSearchTerm('');
    setLoading(false);
    setTotalPages('');
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setCurrentPage(1);
    setTimeout(() => {
      getMovies(1);
      navigate('/browse');
    }, 1000)
  }

  return (
    <div className="home">
      <Navbar selected="home" />
      <header>
        <div className="header__description">
          <h2 className="header__description--title">
            Australia's most awarded free movie platform.
          </h2>
          <h3 className="header__description--subtitle">
            Find your favourite <span className="primary">movies & shows</span> 
          </h3>
          <form onSubmit={onSubmit} className="header__input--container">
            <input
              value={search}
              onChange={(e) => {setSearch(e.target.value)}}
              type="text"
              className="header__input"
              placeholder="Search thousands of movies..."
            />
            <button className={`header__input--search${loading ? ' header__input--search--loading' : ''}`}>
              {
                !loading &&  <i className="fa-solid fa-search"></i>
              }
              {
                loading && <i className="fa-solid fa-spinner"></i>
              }
            </button>
          </form>
        </div>
        <img src={HeaderImage} alt="Header" className="header__img" />
      </header>
      <div className="modal">
        <Link to='/' onClick={toggleMenu}>
          Home
        </Link>
        <Link to='/browse' onClick={() => {
          if(document.body.classList.contains('menu--open')) {
            toggleMenu();
          }
        }}>
          Browse movies
        </Link>
        <Link to='/' onClick={() => {alert('This feature is not available yet.')}}>
          Contact
        </Link>
      </div>
      <button onClick={toggleMenu} className="nav__menu close">
        <i className="fa-solid fa-close"></i>
      </button>
    </div>
  )
}
export default Home