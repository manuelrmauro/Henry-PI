export const GET_RECIPES = 'GET_RECIPES';
export const GET_RECIPE_DETAILS = 'GET_RECIPE_DETAILS';
export const GET_PAGE = 'GET_PAGE';

function _filterByDiets(recipe, diets) {
  let count = 0
  recipe.diets.forEach(recipeDiet => {
    diets.forEach(diet => {
      if (recipeDiet.toLowerCase().includes(diet.toLowerCase())) count++
    })
  })
  if (count >= diets.length) return true
  return false
}

export const getRecipes = function (name = '', order = '', diets = []) {
	return function (dispatch) {
		fetch(`http://localhost:3001/recipes?name=${name}&order=${order}`)
			.then((data) => data.json())
			.then((data) => {
        if (diets.length) {
          data = data.filter(recipe => _filterByDiets(recipe, diets))
        }
				dispatch({ type: GET_RECIPES, payload: data });
			})
			.catch((err) => console.log(err));
	};
};

export const getPage = function (data, page) {
	return function (dispatch) {
		let finalSize = 9;
		let finalPage = 0;
		if (page > 0) finalPage = page;
		let pages = Math.ceil(data.length / finalSize);
		data = data.slice(finalPage * finalSize, finalSize * (finalPage + 1));
		dispatch({
			type: GET_RECIPES,
			payload: {
				content: data,
				pages,
			},
		});
	};
};

export const getRecipesDetails = function () {};

