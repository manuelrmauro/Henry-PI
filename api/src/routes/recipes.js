const { Router } = require('express');
const { Recipe, Step, Diet } = require('../db');

const router = Router();

//  https://api.spoonacular.com/recipes/complexSearch?apiKey=de640b59de324223afa040ca7fe90dad&addRecipeInformation=true&number=100
router.get('/', async function (req, res) {
	const recipes = await Recipe.findAll({
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
	res.json(recipes);
});

module.exports = router;
