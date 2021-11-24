import React from 'react';
import { Link } from 'react-router-dom';
import styles from './card.module.css';

function Card({ image, title, diets, score, id }) {

 
  
	return (
		<Link className={styles.card} to={`/app/recipe/${id}`}>
				<div className={styles.cardTitle}>{title}</div>

				<div className={styles.cardScore}>Score : <b>{score}</b></div>
				<div className={styles.cardImageContainer}>
					<img src={image} alt="foodImage" className={styles.cardImage} />
				</div>
				<div className={styles.cardDiets}>
					{diets.join(', ')}
				</div>
		</Link>
	);
}

export default Card;
