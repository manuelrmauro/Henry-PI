import React from 'react';
import { Link } from 'react-router-dom';
import styles from './welcome.module.css';
import image from '../../welcome.jpg';

function Welcome() {
	return (
		<div className={styles.welcome}>
			<div className={styles.textContainer}>
				<label className={styles.title}>[Recipes App].</label>
				<Link className={styles.link} to="/app">
					Enter
				</Link>
			</div>
			<div className={styles.invisible}></div>
			<div className={styles.backgroundContainer}>
				<img
					src={image}
					alt="background"
					className={styles.background}
					draggable="false"
				/>
			</div>
		</div>
	);
}

export default Welcome;
