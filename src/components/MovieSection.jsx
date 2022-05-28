function MovieSection({ title, value, skeleton }) {
  if(value === 'N/A') {
    return <></>
  }
  return (
    <div className={`movie__selected--section${skeleton ? ' skeleton' : ''}`}>
      <h3 className="movie__selected--subtitle">
        {title}
      </h3>
      {value}
    </div>
  )
}
export default MovieSection