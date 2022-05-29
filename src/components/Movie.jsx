import "./Movie.css"
import { AiFillEye } from "react-icons/ai"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import NoImage from "../assets/No Image.png"

function Movie({ Poster, Title, Year, Type, imdbID, movies, loading }) {
  const [img, setImg] = useState()
  const navigate = useNavigate();

  useEffect(() => {
    if(movies) {
      const image = new Image();
      if(Poster === 'N/A') {
        console.log('N/A')
        image.src = NoImage;
      } else {
        image.src = Poster;
      }
      image.onload = () => {
        setImg(image)
      }
    }
  }, [movies])

  useEffect(() => {
    setImg(undefined)
  }, [loading])

  if(loading) {
    return (
      <div className="movie__wrapper">
        <div className="movie movie__skeleton"></div>
      </div>
    )
  }
  if(!loading && !img) {
    return (
      <div className="movie__wrapper">
        <div className={`movie`}>
          <figure className="movie__img--wrapper">
            <img 
              className="movie__img movie__img--skeleton" />
            <div className="movie__img--overlay">
              <button className="movie__view">
                <AiFillEye />
              </button>
            </div>
          </figure>
          <div className="movie__description">
            <div className="movie__title">
              {Title}
            </div>
            <div className="movie__info">
              <div className="movie__year">
                {Year}
              </div>
              <div className="movie__type" style={{
                backgroundColor: `${Type === 'movie' ? '#33c5e2' : '#66d42f'}`
              }}>
                {Type}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="movie__wrapper">
      <div className={`movie`}>
        <figure className="movie__img--wrapper">
          {img && <img
            className="movie__img"
            src={img.src}
            alt="Movie image"
          />
          }
          <div className="movie__img--overlay">
            <button 
              onClick={() => {navigate(`/browse/${imdbID}`)}}
              className="movie__view"
            >
              <AiFillEye />
            </button>
          </div>
        </figure>
        <div className="movie__description">
          <div className="movie__title">
            {Title}
          </div>
          <div className="movie__info">
            <div className="movie__year">
              {Year}
            </div>
            <div className="movie__type" style={{
              backgroundColor: `${Type === 'movie' ? '#33c5e2' : '#66d42f'}`
            }}>
              {Type}
            </div>
          </div>
      
        </div>
      </div>
    </div>
  )
}
export default Movie