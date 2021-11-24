export const GET_RECIPES = 'GET_RECIPES';
export const GET_RECIPE_DETAILS = 'GET_RECIPE_DETAILS';
export const GET_PAGE = 'GET_PAGE';
export const _LOADING_PAGES = '_LOADING_PAGES';
export const GET_DIETS = 'GET_DIETS';
export const ADD_RECIPE = 'ADD_RECIPE';

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
		dispatch({ type: _LOADING_PAGES });
		fetch(`http://localhost:3001/recipes?name=${name}&order=${order}`)
			.then((data) => data.json())
			.then((data) => {
				if (diets.length) {
					data = data.filter((recipe) => _filterByDiets(recipe, diets));
				}
				const { content, pages } = _paginate(data);
				dispatch({
					type: GET_RECIPES,
					payload: { data, content, pages, actualPage: 1, search: name },
				});
			})
			.catch((err) => {
				dispatch({
					type: GET_RECIPES,
					payload: {
						data: [],
						content: [],
						pages: null,
						actualPage: null,
						search: name,
					},
				});
			});
	};
};

export const getPage = function (data, page) {
	return function (dispatch) {
		dispatch({ type: _LOADING_PAGES });
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
		dispatch({ type: GET_RECIPE_DETAILS, payload: null });
		fetch(`http://localhost:3001/recipes/${id}`)
			.then((res) => res.json())
			.then((res) => {
				dispatch({ type: GET_RECIPE_DETAILS, payload: res });
			})
			.catch((err) => {
				dispatch({ type: GET_RECIPE_DETAILS, payload: {} });
			});
	};
};

export const getDiets = function () {
	return function (dispatch) {
		fetch('http://localhost:3001/types')
			.then((res) => res.json())
			.then((res) => {
				dispatch({ type: GET_DIETS, payload: res });
			})
			.catch((err) => {
				dispatch({ type: GET_DIETS, payload: [] });
			});
	};
};

export const addRecipe = function (recipe) {
	return function (dispatch) {
		fetch('http://localhost:3001/recipe', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(recipe),
		})
			.then((res) => res.json())
			.then((res) => {
				dispatch({ type: ADD_RECIPE, payload: res.id });
				dispatch({ type: ADD_RECIPE, payload: null });
			})
			.catch((err) => {
			});
	};
};
