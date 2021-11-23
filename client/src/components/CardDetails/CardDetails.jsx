import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getRecipeDetails } from '../../redux/actions';

function CardDetails({ match, recipe, getRecipeDetails }) {
	const id = match.params.id;

	useEffect(() => {
		getRecipeDetails(id);
	}, []);

	return (
		<div>
			{recipe ? (
				Object.keys(recipe).length ? (
					<div>
						{recipe.id}
						{recipe.title}
					</div>
				) : (
					'ERROR 404 not found'
				)
			) : (
				'LOADING...'
			)}
		</div>
	);
}

function mapStateToProps(state) {
	return {
		recipe: state.recipe,
	};
}

export default connect(mapStateToProps, { getRecipeDetails })(CardDetails);
