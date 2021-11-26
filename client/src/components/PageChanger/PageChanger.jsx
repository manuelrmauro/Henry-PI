import React from 'react';
import { connect } from 'react-redux';
import { getPage } from '../../redux/actions';
import styles from './pagechanger.module.css';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';

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
		<div className={styles.pageChanger}>
			{pages > 1 && (
				<div className={styles.pageChanger}>
					{page > 1 ? (
						<button
							onClick={(e) => handlePrevPage(e)}
							className={styles.pageChangerBtn}
						>
							<FaArrowAltCircleLeft />
						</button>
					) : (
						<button disabled={true} className={styles.pageChangerBtn}>
							<FaArrowAltCircleLeft />
						</button>
					)}
					{page}/{pages}
					{page < pages ? (
						<button
							onClick={(e) => handleNextPage(e)}
							className={styles.pageChangerBtn}
						>
							<FaArrowAltCircleRight />
						</button>
					) : (
						<button disabled={true} className={styles.pageChangerBtn}>
							<FaArrowAltCircleRight />
						</button>
					)}
				</div>
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
