const { Router } = require('express');
// Importar todos los routers;
const recipeRouter = require('./recipe.js');
const recipesRouter = require('./recipes.js');
const typesRouter = require('./types.js');


const router = Router();

// Configurar los routers
 router.use('/recipe', recipeRouter);
 router.use('/recipes', recipesRouter);
 router.use('/types', typesRouter);



module.exports = router;
