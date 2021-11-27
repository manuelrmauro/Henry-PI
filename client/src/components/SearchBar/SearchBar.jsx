import styles from './searchbar.module.css';
import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { getRecipes, getDiets } from '../../redux/actions';
import { useHistory } from 'react-router-dom';
import { IoSearchCircleSharp } from 'react-icons/io5';
import { IoMdRefreshCircle } from 'react-icons/io';

function SearchBar({ diets, search, getRecipes }) {
	//carga las dietas
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getDiets());
	}, [dispatch]);

	const history = useHistory();

	// nombre que se busca
	const [input, setInput] = useState({
		name: '',
	});

	// ordenamiento y dietas que se buscan
	const [filters, setFilters] = useState({
		order: '',
		diets: [],
	});

	// hace una busqueda automatica cada vez que se modifica DIET o ORDER
	useEffect(() => {
		if (filters.diets.length) {
			getRecipes(input.name, filters.order, filters.diets);
		} else {
			getRecipes(input.name, filters.order);
		}
	}, [filters.order, filters.diets]);

	// hace la busqueda por nombre modificando el parametro NAME
	function handleOnSubmit(e) {
		e.preventDefault();
		history.push('/app');
		if (filters.diets.length) {
			getRecipes(input.name, filters.order, filters.diets);
		} else {
			getRecipes(input.name, filters.order);
		}
	}

	// modifica filters.order
	function handleOrder(e) {
		history.push('/app');
		setFilters({ ...filters, order: e.target.value });
	}

	// modifica fiters.diets
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

	// modifica input.name
	function handleInputChange(e) {
		e.preventDefault();
		setInput({ ...input, [e.target.name]: e.target.value });
	}

	// vuelve a hacer la busqueda, por si hubo actualizaciones
	function handleRefresh(e) {
		history.push('/app');
		e.preventDefault();
		if (filters.diets.length) {
			getRecipes(search, filters.order, filters.diets);
		} else {
			getRecipes(search, filters.order);
		}
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
					value={filters.order}
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
				<button onClick={(e) => handleRefresh(e)} className={styles.refreshBtn}>
					<IoMdRefreshCircle />
				</button>
			</div>
		</form>
	);
}

function mapStateToProps(state) {
	return {
		diets: state.diets,
		search: state.search,
	};
}

export default connect(mapStateToProps, { getRecipes })(SearchBar);
