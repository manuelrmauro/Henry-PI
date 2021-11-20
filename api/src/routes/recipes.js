const { Router } = require('express');
const { Recipe, Step, Diet } = require('../db');
const axios = require('axios')

const router = Router();

//  https://api.spoonacular.com/recipes/complexSearch?apiKey=de640b59de324223afa040ca7fe90dad&addRecipeInformation=true&number=100
router.get('/', async function (req, res) {
	
	try {
		//DATABASE
		const dbRecipes = await Recipe.findAll({
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
		});
		return res.json(dbRecipes)
		// EXTERNAL API
		const eaRecipes = await axios.get('https://api.spoonacular.com/recipes/complexSearch?apiKey=de640b59de324223afa040ca7fe90dad&addRecipeInformation=true&number=100')
		.then(res => res.data.results)

		res.json([...dbRecipes,...eaRecipes]);
	} catch (error) {
		console.log(error)
	}

	
});

module.exports = router;
