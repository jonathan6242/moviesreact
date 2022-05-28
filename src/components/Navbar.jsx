import { Link } from "react-router-dom"

function Navbar({ selected }) {
  const toggleMenu = () => {
    document.body.classList.toggle('menu--open')
  }

  return (
    <nav>
      <Link to='/'>
        <div className="nav__logo">
          <i className="fa-solid fa-clapperboard"></i>
          <h2>movies</h2>
        </div>
      </Link>
      <div className="nav__links">
        <Link 
          className={`link__hover-effect ${selected === 'home' ? 'selected' : ''}`} 
          to='/'
        >
          Home
        </Link>
        <Link
          className={`link__hover-effect ${selected === 'browse' ? 'selected' : ''}`} 
          to='/browse'
        >
          Browse movies
        </Link>
        <button className="nav__contact" onClick={() => {alert('This feature is not available yet.')}}>
          Contact
        </button>
      </div>
      <button onClick={toggleMenu} className="nav__menu">
        <i className="fa-solid fa-bars"></i>
      </button>
    </nav>
  )
}
export default Navbar