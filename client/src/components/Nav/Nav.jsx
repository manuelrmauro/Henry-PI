import React,{useState} from 'react'
import SearchBar from '../SearchBar/SearchBar'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getRecipes} from '../../redux/actions'

function Nav({getRecipes}) {

  const [refresh, setRefresh] = useState(true)
  
  function onClick() {
    setRefresh(false)
    setTimeout(() => {
      setRefresh(true)
    },1)
    getRecipes()
  }

  return (
    <div>
      <Link to='/app' onClick={(e) => onClick(e)}>APP</Link>
      {refresh?<SearchBar/>:false}
      
    </div>
  )
}

export default connect(null, {getRecipes})(Nav)
