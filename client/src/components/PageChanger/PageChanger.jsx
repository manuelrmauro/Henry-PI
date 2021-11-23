import React from 'react';
import { connect } from 'react-redux';
import { getPage } from '../../redux/actions';

function PageChanger({ page, pages, allRecipes, getPage }) {
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
			{pages > 1 ? (
				<div>
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
			) : (
				false
			)}
		</div>
	);
}

function mapStateToProps(state) {
	return {
		page: state.actualPage,
		pages: state.pages,
		allRecipes: state.recipes,
	};
}

export default connect(mapStateToProps, { getPage })(PageChanger);
