import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { getRecipes } from '../../redux/actions';
import CardContainer from '../CardContainer/CardContainer';
import PageChanger from '../PageChanger/PageChanger';

function Home({ recipes, search }) {
	const dispatch = useDispatch()
	useEffect(() => {
		if (!recipes) {
			dispatch(getRecipes())
		}
	}, [dispatch, recipes]);

	return (
		<div>
			{search.length?<p>Resultado de busqueda de: '{search}'</p>:null}
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
		search: state.search
	};
}

export default connect(mapStateToProp, null)(Home);
