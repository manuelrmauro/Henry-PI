import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getDiets, addRecipe } from '../../redux/actions';
import {useHistory} from 'react-router-dom'

function AddForm({ diets, postId, getDiets , addRecipe}) {
	useEffect(() => {
		getDiets();
	}, []);

  useEffect(() => {
    if (postId) history.push('/app/recipe/' + postId)
  },[postId])

  const history = useHistory()
	const [steps, setSteps] = useState({ 1: '' });
	const [input, setInput] = useState({
		title: '',
		summary: '',
		score: 0,
		healthScore: 0,
		readyInMinutes: 0,
		image: '',
		diets: [],
	});

	function handleAddStep(e) {
		e.preventDefault();
		setSteps({ ...steps, [Object.keys(steps).length + 1]: '' });
		console.log(steps);
	}

	function handleRemoveStep(e) {
		e.preventDefault();
		const newSteps = { ...steps };
		delete newSteps[Object.keys(steps).length];
		setSteps(newSteps);
	}

	function handleInputChange(e) {

		if(typeof diets.find(diet => diet.name === e.target.name) === 'object') {
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
    }
		else if (Number.isInteger(parseInt(e.target.name))) {
      const newSteps = {...steps}
      newSteps[e.target.name] = e.target.value
      setSteps(newSteps)
		} else {
      setInput({ ...input, [e.target.name]: e.target.value });
    }
    console.log(input)
	}

  function handleSubmit(e) {
    e.preventDefault()
    const finalSteps = Object.keys(steps).map(step => steps[step])
    const finalObj = {...input, steps: finalSteps}
    addRecipe(finalObj)
  }

	return (
		<div>
			<h1>ADD NEW RECIPE</h1>
			<form onSubmit={e =>handleSubmit(e)}>
				<div>
					<label>Title</label>
					<input
						type="text"
						onChange={(e) => handleInputChange(e)}
						name="title"
            value={input.title}
					/>
				</div>
				<div>
					<label>Summary</label>
					<textarea name="summary" onChange={(e) => handleInputChange(e)} value={input.summary}/>
				</div>
				<div>
					<label>Score</label>
					<input
						type="range"
						min="0"
						max="100"
						step="1"
						name="score"
						onChange={(e) => handleInputChange(e)}
            value={input.score}
					/>
				</div>
				<div>
					<label>Health Score</label>
					<input
						type="range"
						min="0"
						max="100"
						step="1"
						name="healthScore"
						onChange={(e) => handleInputChange(e)}
            value={input.healthScore}
					/>
				</div>
				<div>
					<label>Ready in</label>
					<input
						type="number"
						name="readyInMinutes"
						onChange={(e) => handleInputChange(e)}
            value={input.readyInMinutes}
					/>
					<label> (minutes)</label>
				</div>
				<div>
					<label>Diets</label>
					{diets
						? diets.map((diet) => (
								<span>
									<input
										key={diet.id}
										type="checkbox"
										name={diet.name}
										onClick={(e) => handleInputChange(e)}
									/>
									<label>{diet.name}</label>
								</span>
						  ))
						: null}
				</div>
				<div>
					<label>Steps</label>
					{Object.keys(steps).map((step) => (
						<div>
							<label>STEP {step}</label>
							<textarea name={step} onChange={(e) => handleInputChange(e)} value={steps[step]}/>
							{step >= Object.keys(steps).length ? (
								<button onClick={(e) => handleAddStep(e)}>+</button>
							) : (
								false
							)}

							{step >= Object.keys(steps).length && step > 1 ? (
								<button onClick={(e) => handleRemoveStep(e)}>DELETE</button>
							) : (
								false
							)}
						</div>
					))}
				</div>
				<div>
					<label>Image url</label>
					<input
						type="url"
						name="image"
						onChange={(e) => handleInputChange(e)}
            value={input.image}
					/>
				</div>
				<input type="submit" value="CREATE" />
			</form>
		</div>
	);
}

function mapStateToProps(state) {
	return {
		diets: state.diets,
    postId: state.postId
	};
}

export default connect(mapStateToProps, { getDiets, addRecipe })(AddForm);
