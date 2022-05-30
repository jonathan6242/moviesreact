import { useContext } from "react"
import MovieContext from "../context/MovieContext"


function PageButton({children, current, expand, direction, changeCurrentPage, setCurrentPage}) {
  // const { setCurrentPage } = useContext(MovieContext)

  const expandInput = (direction) => {
    if(!direction) {
      const button = document.querySelector('.page-button__expand');
      const input = document.querySelector('.page-button__input');
      button.classList.add('hidden');
      input.classList.remove('hidden');
      input.focus();
      return;
    }
    const button = document.querySelector(`.page-button__expand--${direction}`);
    const input = document.querySelector(`.page-button__input--${direction}`);
    const direction2 = direction === 'right' ? 'left' : 'right';
    const button2 = document.querySelector(`.page-button__expand--${direction2}`);
    const input2 = document.querySelector(`.page-button__input--${direction2}`);
    button.classList.add('hidden');
    input.classList.remove('hidden');
    input.focus();
    if(button2.classList.contains('hidden')) {
      button2.classList.remove('hidden');
    }
    if(!input2.classList.contains('hidden')) {
      input2.classList.add('hidden');
    }
  }

  const clearInputs = () => {
    const buttons = document.querySelectorAll('.page-button__expand');
    const inputs = document.querySelectorAll('.page-button__input');
    for(let button of buttons) {
      if(button.classList.contains('hidden')) {
        button.classList.remove('hidden');
      }
    }
    for(let input of inputs) {
      if(!input.classList.contains('hidden')) {
        input.classList.add('hidden');
      }
    }
  }

  const onClick = ({ target }) => {
    if(target.classList.contains('page-button__expand--right')) {
      expandInput('right');
    } else if(target.classList.contains('page-button__expand--left')) {
      expandInput('left');
    } else {
      expandInput();
    }
  }

  const onKeyDown = (e) => {
    if(e.key === 'Enter') {
      changeCurrentPage(+e.target.value);
      clearInputs();
      e.target.value = '';
    }
  }

  if(expand) {
    return (
      <>
        <button onClick={onClick} className={
          `page-button page-button__expand page-button__expand--${direction} `
        }>
          ...
        </button>
        <input onKeyDown={onKeyDown} className={`page-button__input page-button__input--${direction} hidden`} type="number"/>
      </>
    )
  }

  return (
    <button
      onClick={() => {setCurrentPage(children)}}
      className={`page-button${current ? ' current' : ''}`}
    >
      {children}
    </button>
  )
}
export default PageButton