import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { getRecipeDetails, emptyRecipeDetails } from '../../redux/actions';
import styles from './carddetails.module.css';

function CardDetails({ match, recipe }) {
	const id = match.params.id;
	const dispatch = useDispatch();

	// carga los datos de la receta
	useEffect(() => {
		dispatch(getRecipeDetails(id));
	}, [dispatch, id]);

	// borra los datos guardados, para que no halla 'saltos' de pagina cuando se busque una nueva receta
	useEffect(
		() => () => {
			dispatch(emptyRecipeDetails());
		},
		[]
	);

	return (
		<div className={styles.loadingContainer}>
			{recipe ? (
				Object.keys(recipe).length ? (
					<div className={styles.cardDetailsContainer}>
						<div
							className={styles.cardDetails}
							style={{
								backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.75), white), url(${recipe.image})`,
								backgroundPosition: 'top',
								backgroundSize: 'cover',
								backgroundRepeat: 'no-repeat',
							}}
						>
							<div className={styles.cdTitle}>{recipe.title}</div>
							{recipe.diets.length ? (
								<div className={styles.cdDiets}>{recipe.diets.join(', ')}</div>
							) : null}
							<div className={styles.cdReady}>
								Ready in <b>{recipe.readyInMinutes}'</b>
							</div>
							<div className={styles.cdScore}>
								Score: <b>{recipe.spoonacularScore}</b>
							</div>
							<div className={styles.cdHealthScore}>
								Health Score: <b>{recipe.healthScore}</b>
							</div>
							<div
								className={styles.cdSummary}
								dangerouslySetInnerHTML={{ __html: recipe.summary }}
							/>
							<div className={styles.cdPasos}>
								{recipe.analyzedInstructions[0].steps.map((step) => (
									<div key={step.number} className={styles.cdPaso}>
										<div className={styles.cdPasoTitle}>STEP {step.number}</div>
										<div className={styles.cdPasoText}>{step.step}</div>
									</div>
								))}
							</div>
						</div>
					</div>
				) : (
					<div className={styles.cdText}>ERROR 404 not found</div>
				)
			) : (
				<img
					className={styles.loading}
					alt="loading"
					src="https://c.tenor.com/I6kN-6X7nhAAAAAi/loading-buffering.gif"
				/>
			)}
		</div>
	);
}

function mapStateToProps(state) {
	return {
		recipe: state.recipe,
	};
}

export default connect(mapStateToProps, null)(CardDetails);
