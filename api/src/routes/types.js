const { Router } = require('express');
const {Diet} = require('../db')


const router = Router();

router.get('/', async (req,res) => {
  // trae las diets de la db
  try {
    const types = await Diet.findAll()
    res.json(types)
  } catch (error) {
    res.status(400)
  }
})



module.exports = router;