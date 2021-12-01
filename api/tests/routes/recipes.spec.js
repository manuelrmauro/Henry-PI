/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, conn } = require('../../src/db.js');

const agent = session(app);
const recipe1 = {
	title: 'A',
	summary: 'Summary',
	spoonacularScore: 0,
};
const recipe2 = {
	title: 'Hamburgesa completa',
	summary: 'Summary',
	spoonacularScore: 80,
};
const recipe3 = {
	title: 'Milanesa completa',
	summary: 'Summary',
	spoonacularScore: 100,
};
const recipe4 = {
	title: 'Z',
	summary: 'Summary',
	spoonacularScore: 100,
};
// IMPORTANTE: antes de hacer estos test deberian pasar todos los test de models!!!

describe('Recipes routes', () => {
	before(() =>
		conn.authenticate().catch((err) => {
			console.error('Unable to connect to the database:', err);
		})
	);
	beforeEach(() =>
		Recipe.sync({ force: true }).then(() => {
			Recipe.create(recipe1);
			Recipe.create(recipe2);
			Recipe.create(recipe3);
			Recipe.create(recipe4);
		})
	);
	describe('GET /recipes', () => {
		it('deberia devolver status 200', () =>
			agent.get('/recipes').then((res) => {
				expect(200);
			}));
		it('deberia traer 100 recetas de la api externa', () =>
			agent
				.get('/recipes')
				.then((res) => expect(res.body).to.have.lengthOf.above(99)));
		it('deberia incluir las recetas creadas en la database', () =>
			agent
				.get('/recipes')
				.then((res) => expect(res.body).to.have.lengthOf(104)));
		it('deberia buscar por nombre', () =>
			agent
				.get('/recipes?name=completa')
				.then((res) => expect(res.body).to.have.lengthOf.above(1)));
		it('deberia devolver un array vacio cuando no encuentra resultados', () =>
			agent
				.get('/recipes?name=complete')
				.then((res) => expect(res.body).to.deep.equal([])));
		it('deberia buscar por nombre ignorando mayusculas y minusculas', () =>
			agent
				.get('/recipes?name=COMPLETA')
				.then((res) => expect(res.body).to.have.lengthOf.above(1)));
		it('deberia ordenar por orden alfabetico', () =>
			agent
				.get('/recipes?order=alpha')
				.then((res) => expect(res.body[0].title).to.be.equal('A')));
		it('deberia ordenar por orden alfabetico descendiente', () =>
			agent
				.get('/recipes?order=alphaDesc')
				.then((res) => expect(res.body[0].title).to.be.equal('Z')));
		it('deberia ordenar por score de mayor a menor', () =>
			agent
				.get('/recipes?order=scoreDesc')
				.then((res) => expect(res.body[0].spoonacularScore).to.be.equal(100)));
		it('deberia ordenar por score de menor a mayor', () =>
			agent
				.get('/recipes?order=score')
				.then((res) => expect(res.body[0].spoonacularScore).to.be.equal(0)));
		it('deberia buscar por nombre y ordenar alfabeticamente', () =>
			agent
				.get('/recipes?name=completa&order=alphaDesc')
				.then((res) =>
					expect(res.body[0].title).to.be.equal('Milanesa completa')
				));
		it('deberia buscar por nombre y ordenar por score', () =>
			agent
				.get('/recipes?name=completa&order=scoreDesc')
				.then((res) =>
					expect(res.body[0].title).to.be.equal('Milanesa completa')
				));
	});
	describe('GET recipes/:id', () => {
		xit('deberia tirar error 404 si no encuentra receta por id', () =>
			agent.get('/recipes/1000000000').expect(404));
		xit('deberia devuelve un objeto vacio si no encuentra recetea por id', () =>
			agent
				.get('/recipes/1000000000')
				.then((res) => expect(res.body).to.deep.equal({})));
		xit('deberia buscar una receta por id por params', () =>
			agent
				.get('/recipes/1000038')
				.then((res) => expect(res.body).to.be.equal('Hamburgesa completa')));
	});

});
