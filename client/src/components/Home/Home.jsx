import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getRecipes, getPage } from '../../redux/actions';

function Home({ recipes, allRecipes, page, pages, getRecipes, getPage }) {
	useEffect(() => {
		getRecipes();
	}, []);

	function handlePrevPage(e) {
		e.preventDefault();
		getPage(allRecipes, --page);
	}

	function handleNextPage(e) {
		e.preventDefault();
		getPage(allRecipes, ++page);
	}

	return (
		<div>
			{recipes ? (
				recipes.map((recipe) => {
					return (
						<p>
							{recipe.title} {recipe.spoonacularScore} {recipe.id}
						</p>
					);
				})
			) : 
				<p>loading...</p>
			}
			{page > 1 ? (
				<button onClick={(e) => handlePrevPage(e)}>{'<'}</button>
			) : (
				false
			)}
			{page}/{pages}
			{page < pages ? (
				<button onClick={(e) => handleNextPage(e)}>{'>'}</button>
			) : (
				false
			)}
		</div>
	);
}

function mapStateToProp(state) {
	return {
		allRecipes: state.recipes,
		recipes: state.paginatedRecipes,
		page: state.actualPage,
		pages: state.pages,
	};
}

export default connect(mapStateToProp, { getRecipes, getPage })(Home);
