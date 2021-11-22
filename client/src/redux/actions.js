export const GET_RECIPES = 'GET_RECIPES';
export const GET_RECIPE_DETAILS = 'GET_RECIPE_DETAILS';
export const GET_PAGE = 'GET_PAGE';
export const _LOADING = '_LOADING';

function _filterByDiets(recipe, diets) {
	let count = 0;
	recipe.diets.forEach((recipeDiet) => {
		diets.forEach((diet) => {
			if (recipeDiet.toLowerCase().includes(diet.toLowerCase())) count++;
		});
	});
	if (count >= diets.length) return true;
	return false;
}

function _paginate(data, page = 1) {
	let finalSize = 9;
	let finalPage = 1;
	if (page > 1) finalPage = page;
	let pages = Math.ceil(data.length / finalSize);
	const content = data.slice(
		(finalPage - 1) * finalSize,
		finalSize * finalPage
	);
	return { content, pages };
}

export const getRecipes = function (name = '', order = '', diets = []) {
	return function (dispatch) {
		dispatch({ type: _LOADING });
		fetch(`http://localhost:3001/recipes?name=${name}&order=${order}`)
			.then((data) => data.json())
			.then((data) => {
				if (diets.length) {
					data = data.filter((recipe) => _filterByDiets(recipe, diets));
				}
				const { content, pages } = _paginate(data);
				dispatch({
					type: GET_RECIPES,
					payload: { data, content, pages, actualPage: 1 },
				});
			})
			.catch((err) => console.log(err));
	};
};

export const getPage = function (data, page) {
	return function (dispatch) {
		dispatch({ type: _LOADING });
		const { content, pages } = _paginate(data, page);
		dispatch({
			type: GET_PAGE,
			payload: {
				content,
				pages,
				actualPage: page,
			},
		});
	};
};

export const getRecipeDetails = function (id) {
	return function (dispatch) {
		fetch(`http://localhost:3001/recipes/${id}`)
		.then(res => res.json())
		.then(res => {
			dispatch({type:GET_RECIPE_DETAILS, payload: res})
		})
		.catch((err) => console.log(err));
	}
};
