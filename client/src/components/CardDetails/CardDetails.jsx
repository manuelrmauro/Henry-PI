import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getRecipeDetails } from '../../redux/actions';

function CardDetails({ match, recipe, getRecipeDetails }) {
	const id = match.params.id;

	useEffect(() => {
		getRecipeDetails(id);
	}, []);
	/* 
	[ ] Los campos mostrados en la ruta principal para cada receta (imagen, nombre, tipo de plato y tipo de dieta)
	[ ] Resumen del plato
	[ ] Puntuación
	[ ] Nivel de "comida saludable"
	[ ] Paso a paso */

	return (
		<div>
			{recipe ? (
				Object.keys(recipe).length ? (
					<div>
						<h1>{recipe.title}</h1>
						<img src={recipe.image} width="100" alt="food" />
						<p>{recipe.summary}</p>
						<p>Score : {recipe.spoonacularScore}</p>
						<p>Health Score: {recipe.healthScore}</p>
						{recipe.diets.map((diet) => (
							<p>{diet}</p>
						))}
						{recipe.analyzedInstructions[0].steps.map(step => <div>
							<h2>PASO {step.number}</h2>
							<p>{step.step}</p>
						</div>)}
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
