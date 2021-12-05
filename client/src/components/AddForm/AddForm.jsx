import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { getDiets, addRecipe } from '../../redux/actions';
import { useHistory } from 'react-router-dom';
import styles from './addform.module.css';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { FaArrowAltCircleLeft } from 'react-icons/fa';

function AddForm({ diets, postId, addRecipe }) {
	const history = useHistory();
	const dispatch = useDispatch();
	//guarda todos los inputs
	const [input, setInput] = useState({
		title: '',
		summary: '',
		score: 0,
		healthScore: 0,
		readyInMinutes: 0,
		image: '',
		diets: [],
	});
	// guarda los steps
	const [steps, setSteps] = useState({});
	// controla si el sumbit es valido o no para habilitar el boton
	const [validate, setValidate] = useState({
		submit: true,
	});
	// muestra el gif de success cuando se crea la nueva receta
	const [success, setSuccess] = useState('none');

	// carga las dietas
	useEffect(() => {
		dispatch(getDiets());
	}, [dispatch]);

	// muestra el gif de success
	useEffect(() => {
		if (postId) {
			setSuccess('flex');
			setTimeout(() => {
				history.push('/app/recipe/' + postId);
			}, 1100);
		}
	}, [postId, history]);

	// si se borran los datos del input de minutos, se restablece en 0
	useEffect(() => {
		if (!input.readyInMinutes) setInput({ ...input, readyInMinutes: 0 });
	}, [input.readyInMinutes]); // si agrego solo input tira error todo el tiempo

	// controla la valadacion para habilitar o deshabilitar el submit
	useEffect(() => {
		if (Object.keys(validate).length <= 1 && input.title && input.summary) {
			setValidate({...validate, submit: false})
		} else {
		 setValidate({...validate, submit: true})
		}
 }, [input.title, input.summary, input.image]); // si agrego validate tira error todo el tiempo

	// no deja que title y summary seando solo espacios '   '
	useEffect(() => {
		if (input.title)
			setInput({
				...input,
				title: input.title.trimStart(),
			});
		if (input.summary)
			setInput({
				...input,
				summary: input.summary.trimStart(),
			});
	}, [input.title, input.summary]); // si agrego solo input, o validate, tira error todo el tiempo

	// agrega un nuevo step
	function handleAddStep(e) {
		e.preventDefault();
		setSteps({ ...steps, [Object.keys(steps).length + 1]: '' });
	}

	// borra el ultimo step
	function handleRemoveStep(e) {
		e.preventDefault();
		const newSteps = { ...steps };
		delete newSteps[Object.keys(steps).length];
		setSteps(newSteps);
	}

	// maneja los cambios de todos los inputs
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
		// maneja la validacion 
		if (e.target.name === 'title') {
			if (e.target.value.length === 0 || e.target.value.trim() === '') {
				setValidate({ ...validate, title: 'enter a title' });
			} else if (!/^[a-zA-Z áéíóúÁÉÍÓÚñÑ\s]*$/.test(e.target.value)) {
				setValidate({ ...validate, title: 'title can only have letters' });
			} else {
				setValidate(removeStateProp(validate, 'title'));
			}
		}
		if (e.target.name === 'summary') {
			if (e.target.value.length === 0 || e.target.value.trim() === '') {
				setValidate({ ...validate, summary: 'enter a summary' });
			} else {
				setValidate(removeStateProp(validate, 'summary'));
			}
		}
		if (e.target.name === 'image') {
			if (
				e.target.value.substring(0, 7) !== 'http://' &&
				e.target.value.substring(0, 8) !== 'https://' &&
				e.target.value.length
			) {
				setValidate({ ...validate, image: 'image must be an url' });
			} else {
					setValidate(removeStateProp(validate, 'image'));
			}
		}
	}

	function removeStateProp(prevState, prop) {
		const state = { ...prevState };
		delete state[prop];
		return state;
	}

	// acomoda el title a la primera letra mayuscula y las demas minusculas, y submitea
	function handleSubmit(e) {
		function capitalize(string) {
			return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
		}
		e.preventDefault();
		setValidate({ ...validate, submit: true });
		const finalSteps = Object.keys(steps).map((step) => steps[step]);
		const finalObj = { ...input, steps: finalSteps };
		finalObj.title = capitalize(finalObj.title);
		if (finalObj.image === '') delete finalObj.image;
		addRecipe(finalObj);
	}

	return (
		<div className={styles.addFormContainer}>
			<button onClick={() => history.goBack()} className={styles.backBtn}>
				<FaArrowAltCircleLeft />
			</button>
			<div className={styles.created} style={{ display: success }}>
				<img
					style={{ display: success }}
					src="https://thumbs.gfycat.com/QuaintLikelyFlyingfish-size_restricted.gif"
					alt="created"
				/>
			</div>
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
