import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// https://www.omdbapi.com/?i=tt3896198&apikey=74514e3b
import Home from "./pages/Home"
import Browse from "./pages/Browse";
import { MovieProvider } from "./context/MovieContext";
import MoviePage from "./pages/MoviePage";
import Favourites from "./pages/Favourites";

function App() {
  const onClick = (e) => {
    if(e.target.classList.contains('page-button__expand') 
    || e.target.classList.contains('page-button__input')) {
      return;
    }
    const pageInputs = document.querySelectorAll('.page-button__input');
    const pageButtons = document.querySelectorAll('.page-button__expand');
    if(pageInputs.length > 0) {
      for(let pageInput of pageInputs) {
        if(!pageInput.classList.contains('hidden')) {
          pageInput.classList.add('hidden')
        }
      }
      for(let pageButton of pageButtons) {
        if(pageButton.classList.contains('hidden')) {
          pageButton.classList.remove('hidden');
        }
      }
    }
  }

  return (
    <MovieProvider>
      <Router>
      <div className="App" onClick={onClick}>
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/browse' element={<Browse />} />
          <Route path='/browse/:id' element={<MoviePage />} />
          <Route path='/favourites' element={<Favourites />} />
        </Routes>
      </div>
      </Router>
    </MovieProvider>
  );
}

export default App;
