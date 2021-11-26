import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { getDiets, addRecipe } from '../../redux/actions';
import { useHistory } from 'react-router-dom';
import styles from './addform.module.css';
import { BsFillPlusCircleFill } from 'react-icons/bs';

function AddForm({ diets, postId, addRecipe }) {
	const history = useHistory();
	const [steps, setSteps] = useState({});
	const [input, setInput] = useState({
		title: null,
		summary: null,
		score: 0,
		healthScore: 0,
		readyInMinutes: 0,
		image: '',
		diets: [],
	});
	const [validate, setValidate] = useState({
		submit: true,
	});
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getDiets());
	}, [dispatch]);

	useEffect(() => {
		if (postId) history.push('/app/recipe/' + postId);
	}, [postId, history]);

	useEffect(() => {
		if (!input.readyInMinutes) setInput({ ...input, readyInMinutes: 0 });
	}, [input.readyInMinutes]);

	useEffect(() => {
		if (input.title)
			setInput({
				...input,
				title: input.title.trimStart()
			});
			if (input.summary)
			setInput({
				...input,
				summary: input.summary.trimStart()
			});
	}, [input.title, input.summary]);

	useEffect(() => {
		function handleValidation() {
			const error = {
				submit: false,
			};
			if (input.title === null) {
				error.error = null;
			} else if (input.title.length === 0) {
				error.title = 'enter a title';
			}
			if (!/^[a-zA-Z áéíóúÁÉÍÓÚñÑ\s]*$/.test(input.title)) {
				error.title = 'title can only have letters';
			}
			if (input.summary === null) {
				error.error = null;
			} else if (input.summary.length === 0) {
				error.summary = 'enter a summary';
			}
			if (
				input.image.substring(0, 7) !== 'http://' &&
				input.image.substring(0, 8) !== 'https://' &&
				input.image.length
			) {
				error.image = 'image must be an url';
			}

			if (Object.keys(error).length > 1) error.submit = true;

			setValidate(error);
			console.log(validate);
		}
		handleValidation();
	}, [input.title, input.summary, input.image]);

	function handleAddStep(e) {
		e.preventDefault();
		setSteps({ ...steps, [Object.keys(steps).length + 1]: '' });
	}

	function handleRemoveStep(e) {
		e.preventDefault();
		const newSteps = { ...steps };
		delete newSteps[Object.keys(steps).length];
		setSteps(newSteps);
	}

	function handleInputChange(e) {
		if (typeof diets.find((diet) => diet.name === e.target.name) === 'object') {
			if (!input.diets.includes(e.target.name)) {
				const diets = [...input.diets];
				const diet = e.target.name;
				diets.push(diet);
				setInput({ ...input, diets });
			} else {
				const diets = [...input.diets];
				const diet = e.target.name;
				const index = diets.indexOf(diet);
				diets.splice(index, 1);
				setInput({ ...input, diets });
			}
		} else if (Number.isInteger(parseInt(e.target.name))) {
			const newSteps = { ...steps };
			newSteps[e.target.name] = e.target.value;
			setSteps(newSteps);
		} else {
			setInput({ ...input, [e.target.name]: e.target.value });
		}
	}

	function handleSubmit(e) {
		function capitalize(string) {
			return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
		}
		e.preventDefault();
		const finalSteps = Object.keys(steps).map((step) => steps[step]);
		const finalObj = { ...input, steps: finalSteps };
		finalObj.title = capitalize(finalObj.title);
		if (finalObj.image === '') delete finalObj.image;
		addRecipe(finalObj);
	}

	return (
		<div className={styles.addFormContainer}>
			<form className={styles.addForm} onSubmit={(e) => handleSubmit(e)}>
				<div className={styles.addFormTitle}>NEW RECIPE</div>

				<label className={styles.afTitle}>Title *</label>

				<input
					className={styles.afTitleInput}
					type="text"
					onChange={(e) => handleInputChange(e)}
					name="title"
					value={input.title}
				/>
				<label className={styles.afError}>
					{'title' in validate && validate.title}
				</label>
				<label className={styles.afTitle}>Summary *</label>

				<textarea
					className={styles.afSummaryInput}
					name="summary"
					onChange={(e) => handleInputChange(e)}
					value={input.summary}
				/>
				<label className={styles.afError}>
					{'summary' in validate && validate.summary}
				</label>
				<div className={styles.afDietsAndScores}>
					<div className={styles.afDiets}>
						<p className={styles.afTitle}>Diets</p>
						{diets &&
							diets.map((diet) => (
								<div key={diet.id}>
									<input
										type="checkbox"
										name={diet.name}
										onClick={(e) => handleInputChange(e)}
									/>
									<label> {diet.name}</label>
								</div>
							))}
					</div>

					<div className={styles.afScores}>
						<label className={styles.afTitle}>Score</label>
						<input
							className={styles.afScoreInput}
							type="range"
							min="0"
							max="100"
							step="1"
							name="score"
							onChange={(e) => handleInputChange(e)}
							value={input.score}
						/>
						<label>{input.score}</label>

						<label className={styles.afTitle}>Health Score</label>
						<input
							className={styles.afHealthScoreInput}
							type="range"
							min="0"
							max="100"
							step="1"
							name="healthScore"
							onChange={(e) => handleInputChange(e)}
							value={input.healthScore}
						/>
						<label>{input.healthScore}</label>

						<label className={styles.afTitle}>
							Ready in{' '}
							<input
								className={styles.afReadyInput}
								type="number"
								name="readyInMinutes"
								onChange={(e) => handleInputChange(e)}
								value={input.readyInMinutes}
								min="0"
								max="1440"
							/>{' '}
							(minutes)
						</label>
					</div>
				</div>

				<p className={styles.afTitle}>Steps</p>
				{Object.keys(steps).map((step) => (
					<div key={step}>
						<div className={styles.stepTitle}>
							{step >= Object.keys(steps).length ? (
								<button
									className={styles.removeStepBtn}
									onClick={(e) => handleRemoveStep(e)}
								>
									<BsFillPlusCircleFill />
								</button>
							) : (
								<button className={styles.removeStepBtn} disabled={true}>
									<BsFillPlusCircleFill />
								</button>
							)}
							<label>Step {step}</label>
						</div>
						<textarea
							className={styles.afStepInput}
							name={step}
							onChange={(e) => handleInputChange(e)}
							value={steps[step]}
						/>
					</div>
				))}
				<button className={styles.addStepBtn} onClick={(e) => handleAddStep(e)}>
					<BsFillPlusCircleFill />
				</button>

				<label className={styles.afTitle}>Image url</label>

				<input
					className={styles.afImageInput}
					type="text"
					name="image"
					onChange={(e) => handleInputChange(e)}
					value={input.image}
				/>
				<label className={styles.afError}>
					{'image' in validate && validate.image}
				</label>
				<div className={styles.afSubmit}>
					<input
						className={styles.afSubmitBtn}
						type="submit"
						value="SAVE"
						disabled={validate.submit}
					/>
				</div>
			</form>
		</div>
	);
}

function mapStateToProps(state) {
	return {
		diets: state.diets,
		postId: state.postId,
	};
}

export default connect(mapStateToProps, { addRecipe })(AddForm);
