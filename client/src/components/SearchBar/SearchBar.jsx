import styles from './searchbar.module.css';
import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { getRecipes, getDiets } from '../../redux/actions';
import { useHistory } from 'react-router-dom';
import {IoSearchCircleSharp} from 'react-icons/io5'

function SearchBar({ diets, getRecipes }) {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getDiets());
	}, [dispatch]);

	const history = useHistory();

	const [input, setInput] = useState({
		name: '',
		order: '',
		diets: [],
		/* disabled: true, */
	});

	function handleOnSubmit(e) {
		e.preventDefault();
		history.push('/app');
		if (input.diets.length) {
			getRecipes(input.name, input.order, input.diets);
		} else {
			getRecipes(input.name, input.order);
		}
		//	setInput({ ...input, name: '', order: '' });
	}

	function handleOrder(e) {
		/* if (e.target.name === 'orderBy') {
			setInput({ ...input, disabled: !input.disabled });
		} else { */
			setInput({ ...input, order: e.target.value });
		
	}

	function handleFilter(e) {
		const diets = [...input.diets];
		const diet = e.target.name;

		if (!diets.includes(diet)) {
			diets.push(diet);
			setInput({ ...input, diets });
		} else {
			const index = diets.indexOf(diet);
			diets.splice(index, 1);
			setInput({ ...input, diets });
		}
	}

	function handleInputChange(e) {
		e.preventDefault();
		setInput({ ...input, [e.target.name]: e.target.value });
	}

	return (
		<form onSubmit={(e) => handleOnSubmit(e)} className={styles.allSearchBar}>
			<div className={styles.searchBar}>
				<input
					onChange={(e) => handleInputChange(e)}
					value={input.name}
					name="name"
					className={styles.searchInput}
				/>
				<button type="submit"className={styles.searchBtn} ><IoSearchCircleSharp/></button>
			</div>
			<div className={styles.orderBy}>
				{/* <input
					type="checkbox"
					onChange={(e) => handleOrder(e)}
					name="orderBy"
					checked={!input.disabled}
				/> */}
				<label>ORDER BY</label>
				<select
					name="orders"
					onChange={(e) => handleOrder(e)}
					value={input.order}
				>
					<option value=""></option>
					<option value="alpha">A-Z</option>
					<option value="alphaDesc">Z-A</option>
					<option value="scoreDesc">MAX</option>
					<option value="score">MIN</option>
				</select>
			</div>
			<div>
				{diets
					? diets.map((diet) => (
							<span>
								<input
									key={diet.id}
									type="checkbox"
									name={diet.name}
									onClick={(e) => handleFilter(e)}
								/>
								<label>{diet.name}</label>
							</span>
					  ))
					: null}
			</div>
		</form>
	);
}

function mapStateToProps(state) {
	return {
		diets: state.diets,
	};
}

export default connect(mapStateToProps, { getRecipes })(SearchBar);
