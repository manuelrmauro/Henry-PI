import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { getRecipes } from '../../redux/actions';
import CardContainer from '../CardContainer/CardContainer';
import PageChanger from '../PageChanger/PageChanger';
import styles from './home.module.css';

function Home({ recipes, search }) {
	const dispatch = useDispatch();
	useEffect(() => {
		if (!recipes && search === '') {
			dispatch(getRecipes());
		}
	}, [dispatch]);

	return (
		<div className={styles.home}>
			{search.length ? (
				<div className={styles.homeText}>Search results of: '{search}'</div>
			):null}
			{recipes ? (
				recipes.length ? (
					<div>
						<PageChanger />
						<CardContainer />
						<PageChanger />
					</div>
				) : (
					<div className={styles.homeText}>No results have been found...</div>
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

function mapStateToProp(state) {
	return {
		recipes: state.paginatedRecipes,
		search: state.search,
	};
}

export default connect(mapStateToProp, null)(Home);
