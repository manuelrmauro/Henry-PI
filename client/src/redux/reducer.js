import { GET_PAGE, GET_RECIPES, GET_RECIPE_DETAILS, _LOADING } from './actions';

const initialState = {
	recipes: [],
	recipe: {},
	paginatedRecipes: null,
	actualPage: null,
	pages: null,
};

function rootReducer(state = initialState, { type, payload }) {
	switch (type) {
		case GET_RECIPES:
			return {
				...state,
				recipes: payload.data,
				paginatedRecipes: payload.content,
				pages: payload.pages,
				actualPage: payload.actualPage,
			};
		case GET_PAGE:
			return {
				...state,
				paginatedRecipes: payload.content,
				pages: payload.pages,
				actualPage: payload.actualPage,
			};
		case GET_RECIPE_DETAILS:
			return {
				...state,
				recipe: payload
			}
		case _LOADING:
			return {
				...state, paginatedRecipes: null
			}
		default:
			return state;
	}
}

export default rootReducer;
