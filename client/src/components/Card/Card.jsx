import React from 'react'
import {Link} from 'react-router-dom'

function Card({image, title, diets, score, id}) {
  return (
    <div>
      <Link to={`/app/${id}`}><h2>{title}</h2></Link>
      <img src={image} width='100' alt='food'/>
      {diets.map(diet => <p>{diet}</p>)}
      <p>Score : {score}</p>
    </div>
  )
}

export default Card
