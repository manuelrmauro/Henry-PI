import React from 'react';
import { connect } from 'react-redux';
import Card from '../Card/Card';
import styles from './cardcontainer.module.css';

function CardContainer({ recipes }) {
	return (
		<div className={styles.cardContainer}>
			{recipes?.map((recipe) => (
				<Card
					key={recipe.id}
					id={recipe.id}
					title={recipe.title}
					image={recipe.image}
					diets={recipe.diets}
					score={recipe.spoonacularScore}
				/>
			))}
		</div>
	);
}

function mapStateToProp(state) {
	return {
		recipes: state.paginatedRecipes,
	};
}

export default connect(mapStateToProp, null)(CardContainer);
