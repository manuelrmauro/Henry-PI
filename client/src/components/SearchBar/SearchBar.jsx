import React,{useState} from 'react'
import {connect} from 'react-redux'
import {getRecipes} from "../../redux/actions"

function SearchBar({getRecipes}) {

  const [input, setInput] = useState({
    name: ''
  })

  function handleOnSubmit(e){
    e.preventDefault()
    getRecipes(input.name)
  }
  function handleInputChange(e){
    e.preventDefault()
    setInput({...input, [e.target.name]:e.target.value})
  }

  return (
    <form onSubmit={e => handleOnSubmit(e)}>
      <input onChange={e => handleInputChange(e)} value={input.search} name='name'/>
      <input type="submit" value='SEARCH'/>
    </form>
  )
}



export default connect(null,{getRecipes})(SearchBar)
