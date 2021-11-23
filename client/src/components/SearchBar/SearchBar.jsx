import React, { useState } from 'react';
import { connect } from 'react-redux';
import { getRecipes } from '../../redux/actions';
import { useHistory } from 'react-router-dom';

function SearchBar({ getRecipes }) {
	const history = useHistory();

	const [input, setInput] = useState({
		name: '',
		order: '',
    disabled: true
	});

	function handleOnSubmit(e) {
		e.preventDefault();
		history.push('/app');
		getRecipes(input.name, input.order);
		setInput({ ...input, name: '', order: '' , disabled: true});

	}

	function handleOrder(e) {
		if (e.target.name === 'orderBy') {
			setInput({...input, disabled: !input.disabled});
		} else {
      setInput({ ...input, order: e.target.value });
		}
	}

	function handleInputChange(e) {
		e.preventDefault();
		setInput({ ...input, [e.target.name]: e.target.value });
	}

	return (
		<form onSubmit={(e) => handleOnSubmit(e)}>
			<input
				onChange={(e) => handleInputChange(e)}
				value={input.name}
				name="name"
			/>
			<input type="submit" value="SEARCH" />
			<div>
				<input
					type="checkbox"
					onChange={(e) => handleOrder(e)}
					name="orderBy"
          checked={!input.disabled}
				/>
				<label>ORDER BY</label>
				<select name="orders" disabled={input.disabled} onChange={(e) => handleOrder(e)} value={input.order}>
					<option value="" ></option>
					<option value="alpha" >A-Z</option>
					<option value="alphaDesc" >Z-A</option>
					<option value="scoreDesc" >MAX</option>
					<option value="score" >MIN</option>
				</select>
			</div>
		</form>
	);
}

export default connect(null, { getRecipes })(SearchBar);
