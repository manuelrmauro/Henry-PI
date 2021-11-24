import styles from './nav.module.css';
import React, { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getRecipes } from '../../redux/actions';
import {AiFillHome, AiFillFileAdd} from 'react-icons/ai'

function Nav({ getRecipes }) {
	const [refresh, setRefresh] = useState(true);

	function onClick() {
		setRefresh(false);
		setTimeout(() => {
			setRefresh(true);
		}, 1);
		getRecipes();
	}

	return (
		<div className={styles.nav}>
			<div className={styles.navIcons}>
				<Link to="/app" onClick={(e) => onClick(e)} className={styles.navIcon}>
					<AiFillHome/>
				</Link>
				<Link to="/app/add" className={styles.navIcon}><AiFillFileAdd/></Link>
			</div>
			{refresh ? <SearchBar /> : false}
		</div>
	);
}

export default connect(null, { getRecipes })(Nav);
