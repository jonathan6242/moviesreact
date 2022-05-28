import { useContext, useState } from "react"
import MovieContext from "../context/MovieContext"
import PageButton from "./PageButton"
import "./Pagination.css"

function Pagination({currentPage, totalPages}) {
  const { setCurrentPage } = useContext(MovieContext);
  
  const changeCurrentPage = (number) => {
    if(number > 0 && number <= totalPages) {
      setCurrentPage(number)
    }
  }

  const generateButtons = (startNumber, endNumber) => {
    if(!endNumber) {
      return (startNumber === currentPage) ? (
        <PageButton current>{startNumber}</PageButton>
      ) : (
        <PageButton>{startNumber}</PageButton>
      )
    }
    return new Array(endNumber - startNumber + 1).fill(0).map((_, index) => {
      return (index + startNumber === currentPage) ? (
        <PageButton current key={index}>
          {index + startNumber}
        </PageButton>
      ) : (
        <PageButton key={index}>{index + startNumber}</PageButton>
      )
    })
  }

  const paginate = (current, total) => {
    if(total <= 5) {
      return generateButtons(1, total)
    } else if (current <= 3) {
      return (
        <>
          {generateButtons(1, 3)}
          <PageButton expand changeCurrentPage={changeCurrentPage} />
          {generateButtons(total)}
        </>
      )
    } else if (current >= total - 2) {
      return (
        <>
          {generateButtons(1)}
          <PageButton expand changeCurrentPage={changeCurrentPage} />
          {generateButtons(total - 2, total)}
        </>
      )
    } else {
      return (
        <>
          {generateButtons(1)}
          <PageButton expand direction={'left'} changeCurrentPage={changeCurrentPage} />
          {generateButtons(current)}
          <PageButton expand direction={'right'} changeCurrentPage={changeCurrentPage} />
          {generateButtons(total)}
        </>
      )
    }
  }

  return (
    <div className="pagination__container">
      <div className="pagination">
        <button
          id="previous"
          disabled={currentPage === 1}
          onClick={() => {setCurrentPage(prev => prev - 1)}}
        >
          <i className="fa-solid fa-chevron-left"></i>
          <span>Back</span> 
        </button>
          {paginate(currentPage, totalPages)}
        <button 
          id="next"
          disabled={currentPage === totalPages}
          onClick={() => {setCurrentPage(prev => prev + 1)}}
        >
          <span>Next</span> 
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </div>
  )
}
export default Pagination