import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getDiets } from '../../redux/actions';

function AddForm({ diets, getDiets }) {
	useEffect(() => {
		getDiets();
	}, []);

  const [steps,setSteps] = useState(
    {1:''}
  )

  function handleAddStep(e) {
    e.preventDefault()
    setSteps({...steps, [Object.keys(steps).length + 1]: ''})
    console.log(steps)
  }

  function handleRemoveStep(e) {
    e.preventDefault()
    const newSteps = {...steps}
    delete newSteps[Object.keys(steps).length]
    setSteps(newSteps)
  }

	return (
		<div>
			ADD FORM
      
			{/* {
    "title" : "Food",
    "summary": "Summary",
    "score": 96,
    "healthScore": 73.3,
    "readyInMinutes": 60,
    "image": "http://www.url.com",
    "steps": ["cocinar", "comer", "guardar sobras"],
    "diets": ["vegetarian","vegan","primal"]
  } */}
			<form>
				<div>
					<label>Title</label>
					<input type="text" name="title" />
				</div>
				<div>
					<label>Summary</label>
					<textarea name="summary" />
				</div>
				<div>
					<label>Score</label>
					<input type="number" name='score' />
				</div>
				<div>
					<label>Health Score</label>
					<input type="number" name='healthScore'/>
				</div>
				<div>
					<label>Ready in</label>
					<input type="number" name='readyInMinutes'/>
					<label> (minutes)</label>
				</div>
				<div>
					<label>Diets</label>
					{diets
						? diets.map((diet) => (
								<span>
									<input key={diet.id} type="checkbox" name={diet.name} />
									<label>{diet.name}</label>
								</span>
						  ))
						: null}
				</div>
				<div>
					<label>Steps</label>
              {Object.keys(steps).map(step => <div>
                <label>STEP {step}</label>
                <textarea name={step}/>
                {step >= Object.keys(steps).length?
                <button onClick={e => handleAddStep(e)}>+</button>:false
              }
                
                {step >= Object.keys(steps).length && step > 1?
                <button onClick={e => handleRemoveStep(e)}>DELETE</button>:false
              }
              </div>)}
				</div>
				<div>
					<label>Image url</label>
          <input type="text" name="image" />
				</div>
				<input type="submit" value="CREATE" />
			</form>
		</div>
	);
}

function mapStateToProps(state) {
	return {
		diets: state.diets,
	};
}

export default connect(mapStateToProps, { getDiets })(AddForm);
