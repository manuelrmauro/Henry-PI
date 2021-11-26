import styles from './searchbar.module.css';
import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { getRecipes, getDiets } from '../../redux/actions';
import { useHistory } from 'react-router-dom';
import { IoSearchCircleSharp } from 'react-icons/io5';

function SearchBar({ diets, search, getRecipes }) {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getDiets());
	}, [dispatch]);

	const history = useHistory();

	const [input, setInput] = useState({
		name: '',
	});

	const [filters, setFilters] = useState({
		order: '',
		diets: [],
	});

	useEffect(()=>{
		if (filters.diets.length) {
			getRecipes(input.name, filters.order, filters.diets);
		} else {
			getRecipes(input.name, filters.order);
		}
	},[filters.order, filters.diets])

	function handleOnSubmit(e) {
		e.preventDefault();
		history.push('/app');
		if (filters.diets.length) {
			getRecipes(input.name, filters.order, filters.diets);
		} else {
			getRecipes(input.name, filters.order);
		}
	}
	
	function handleOrder(e) {
		history.push('/app');
		setFilters({ ...filters, order: e.target.value });

	}

	function handleFilter(e) {
		history.push('/app');
		const diets = [...filters.diets];
		const diet = e.target.name;

		if (!diets.includes(diet)) {
			diets.push(diet);
			setFilters({ ...filters, diets });
		} else {
			const index = diets.indexOf(diet);
			diets.splice(index, 1);
			setFilters({ ...filters, diets });
		}
	}

	function handleInputChange(e) {
		e.preventDefault();
		setInput({ ...input, [e.target.name]: e.target.value });
	}

	return (
		<form onSubmit={(e) => handleOnSubmit(e)} className={styles.allSearchBar}>
			<div className={styles.dietBoxes}>
				{diets &&
					diets.map((diet) => (
						<span key={diet.id} className={styles.dietBox}>
							<input
								type="checkbox"
								name={diet.name}
								onClick={(e) => handleFilter(e)}
								className={styles.dietCheckBox}
							/>
							<label>{diet.name}</label>
						</span>
					))}
			</div>
			<div className={styles.orderBy}>
				<label>ORDER BY</label>
				<select
					name="orders"
					onChange={(e) => handleOrder(e)}
					value={input.order}
					className={styles.orderInput}
				>
					<option value="">ALL</option>
					<option value="alpha">A-Z</option>
					<option value="alphaDesc">Z-A</option>
					<option value="scoreDesc">MAX</option>
					<option value="score">MIN</option>
				</select>
			</div>

			<div className={styles.searchBar}>
				<input
					onChange={(e) => handleInputChange(e)}
					value={input.name}
					name="name"
					className={styles.searchInput}
				/>
				<button type="submit" className={styles.searchBtn}>
					<IoSearchCircleSharp />
				</button>
			</div>
		</form>
	);
}

function mapStateToProps(state) {
	return {
		diets: state.diets,
		search: state.search
	};
}

export default connect(mapStateToProps, { getRecipes })(SearchBar);
