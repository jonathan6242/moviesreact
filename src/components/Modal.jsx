import { Link } from "react-router-dom";

function Modal() {
  const toggleMenu = () => {
    document.body.classList.toggle('menu--open')
  }

  return (
    <>
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
    </>
  )
}
export default Modal