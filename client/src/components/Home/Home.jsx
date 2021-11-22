import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getRecipes, _LOADING } from '../../redux/actions';
import CardContainer from '../CardContainer/CardContainer';
import PageChanger from '../PageChanger/PageChanger';

function Home({ recipes, getRecipes }) {
	useEffect(() => {
		getRecipes();
	}, []);

	return (
		<div>
			{recipes ? (
				recipes.length ? (
					<div>
						<CardContainer />
						<PageChanger />
					</div>
				) : 'NO SE ENCONTRARON RESULTADOS'
			) : 'LOADING...'}
		</div>
	);
}

function mapStateToProp(state) {
	return {
		recipes: state.paginatedRecipes,
	};
}

export default connect(mapStateToProp, { getRecipes })(Home);
