import {
	GET_PAGE,
	GET_RECIPES,
	GET_RECIPE_DETAILS,
	EMPTY_PAGE,
	GET_DIETS,
	ADD_RECIPE,
	LOAD_RECIPES,
	EMPTY_RECIPE_DATAILS,
} from './actions';

const initialState = {
	recipes: [],
	recipe: null,
	paginatedRecipes: null,
	actualPage: null,
	pages: null,
	diets: [],
	search: '',
	postId: null,
	loadRecipes: true,
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
				search: payload.search,
				loadRecipes: false,
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
				recipe: payload,
			};
		case EMPTY_PAGE:
			return {
				...state,
				paginatedRecipes: null,
			};
		case GET_DIETS:
			return {
				...state,
				diets: payload,
			};
		case ADD_RECIPE:
			return {
				...state,
				postId: payload,
			};
		case LOAD_RECIPES:
			return { ...state, loadRecipes: true };
		case EMPTY_RECIPE_DATAILS:
			return {...state, recipe: null}
		default:
			return state;
	}
}

export default rootReducer;
