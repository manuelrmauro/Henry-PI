import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import{getRecipes} from '../../redux/actions'

function Home({recipes, getRecipes }) {

  useEffect(() => {
    getRecipes('','scoreDesc',['vegetarian', 'primal', 'gluten free', 'vegan'])
  },[])

  return (
    <div>
      HOME 
    {recipes.map(recipe => {
      return <p>{recipe.title} {recipe.spoonacularScore} {recipe.diets}</p>
    })}
    </div>
  )
}

function mapStateToProp(state) {
	return {
		recipes : state.recipes
	};
}

export default connect(mapStateToProp, {getRecipes})(Home);
