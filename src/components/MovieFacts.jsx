function MovieFacts({ facts }) {
  const arr = facts.filter(fact => fact !== 'N/A')

  return (
    <div className="movie-facts">
      {
        arr.map((fact, index) => {
            return (
              <span key={index}>
                {fact}
                {index !== arr.length - 1 ? <>&nbsp;•&nbsp;</> : ''}
              </span>
            )
        })
      }
    </div>
  )
}
export default MovieFacts