const { Router } = require('express');
const { Recipe, Step, Diet } = require('../db');
const axios = require('axios')

const router = Router();

//  https://api.spoonacular.com/recipes/complexSearch?apiKey=de640b59de324223afa040ca7fe90dad&addRecipeInformation=true&number=100
router.get('/', async function (req, res) {
	
	try {
		//DATABASE
		let dbRecipes = await Recipe.findAll({
			include: [
				{
					model: Step,
				},
				{
					model: Diet,
				},
			],
			order : [
				[Step, 'number', 'ASC'],
				[Diet,'id','ASC'],
				['id', 'ASC']
			]
		})
		// adapta la lista para que encaje con la informacion traida de la api
		dbRecipes = dbRecipes.map(el => el.get({ plain: true }))
		dbRecipes.forEach(recipe => {
			recipe.diets = recipe.diets.map(diet => diet.name)
			recipe.analyzedInstructions = [{steps : recipe.steps.map(step => ({number :step.number, step : step.step}))}] 
			delete recipe.steps
		})

		// EXTERNAL API
		const eaRecipes = await axios.get('https://api.spoonacular.com/recipes/complexSearch?apiKey=de640b59de324223afa040ca7fe90dad&addRecipeInformation=true&number=100')
		.then(res => res.data.results)
		console.log(eaRecipes.length)
		res.json([...dbRecipes,...eaRecipes]);
	} catch (error) {
		console.log(error)
	}

	
});

module.exports = router;
