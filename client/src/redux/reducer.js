import { GET_PAGE, GET_RECIPES, GET_RECIPE_DETAILS } from './actions';

const initialState = {
	recipes: [],
	recipe: {},
	paginatedRecipes: [],
	pages: null,
};

function rootReducer(state = initialState, { type, payload }) {
	switch (type) {
		case GET_RECIPES:
			return {...state, recipes : payload}
		case GET_PAGE:
			return {...state, paginatedRecipes: payload.content, pages: payload.pages}
		default:
			return state;
	}
}

export default rootReducer;
