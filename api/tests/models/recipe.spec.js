const { Recipe, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Recipe model', () => {
	before(() =>
		conn.authenticate().catch((err) => {
			console.error('Unable to connect to the database:', err);
		})
	);
	describe('Validators', () => {
		beforeEach(() => Recipe.sync({ force: true }));
		describe('title', () => {
			it('Deberia tirar error si title es null', (done) => {
				Recipe.create({
					summary: 'text here',
				})
					.then(() => done(new Error('It requires a valid title')))
					.catch(() => done());
			});
			it('Deberia tirar error si title no es string', (done) => {
				Recipe.create({
					title: 1,
					summary: 'text here',
				})
					.then(() => done(new Error('It requires a valid title')))
					.catch(() => done());
			});
			it('Deberia tirar error si title no contiene solo letras y espacios', (done) => {
				Recipe.create({
					title: 'Comida 1/',
					summary: 'text here',
				})
					.then(() => done(new Error('It requires a valid title')))
					.catch(() => done());
			});
			it('Deberia tirar error si title tiene mas de 50 caracteres', (done) => {
				Recipe.create({
					title:
						'Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa optio, iure quo quod perspiciatis architecto beatae sed iste consequatur voluptatibus non, reiciendis cumque. Voluptatem amet unde, quo ex sed ab?',
					summary: 'text here',
				})
					.then(() => done(new Error('It requires a valid title')))
					.catch(() => done());
			});
		});
		describe('Summary', () => {
			it('Deberia tirar error si summary es null', (done) => {
				Recipe.create({
					title: 'comida',
				})
					.then(() => done(new Error('It requires a valid summary')))
					.catch(() => done());
			});
			it('Deberia tirar error si summary no es string', (done) => {
				Recipe.create({
					title: 'comida',
					summary: [],
				})
					.then(() => done(new Error('It requires a valid summary')))
					.catch(() => done());
			});
			it('Deberia tirar error si summary tiene solo numeros', (done) => {
				Recipe.create({
					title: 'comida',
					summary: 123,
				})
					.then(() => done(new Error('It requires a valid summary')))
					.catch(() => done());
			});
		});
		describe('SpoonacularScore', () => {
			it('Deberia tirar error si SpoonacularScore no es un numero', (done) => {
				Recipe.create({
					title: 'comida',
					summary: 'text here',
					spoonacularScore: 'string',
				})
					.then(() => done(new Error('It requires a valid score')))
					.catch(() => done());
			});
			it('Deberia guardar los datos como entero', function () {
				let recipe = Recipe.build({
					title: 'comida',
					summary: 'text here',
					spoonacularScore: 10.0,
				});
				expect(recipe.spoonacularScore).to.equal(10);
			});
		});
		describe('HealthScore', () => {
			it('Deberia tirar error si HealthScore no es un numero', (done) => {
				Recipe.create({
					title: 'comida',
					summary: 'text here',
					healthScore: 'string',
				})
					.then(() => done(new Error('It requires a valid score')))
					.catch(() => done());
			});
			it('Deberia guardar los datos como numero entero', function () {
				let recipe = Recipe.build({
					title: 'comida',
					summary: 'text here',
					healthScore: 10.0,
				});
				expect(recipe.healthScore).to.equal(10);
			});
		});
		describe('ReadyInMinutes', () => {
			it('Deberia tirar error si ReadyInMinutes no es un numero', (done) => {
				Recipe.create({
					title: 'comida',
					summary: 'text here',
					readyInMinutes: 'string',
				})
					.then(() => done(new Error('It requires a valid time')))
					.catch(() => done());
			});
			it('Deberia guardar los datos como numero entero', function () {
				let recipe = Recipe.build({
					title: 'comida',
					summary: 'text here',
					healthScore: 10.0,
				});
				expect(recipe.healthScore).to.equal(10);
			});
		});
		describe('Image', () => {
			it('Deberia tirar error si Image no es string', (done) => {
				Recipe.create({
					title: 'comida',
					summary: 'text here',
					image: 1,
				})
					.then(() => done(new Error('It requires a valid image')))
					.catch(() => done());
			});
			it('Deberia tirar error si Image no es url', (done) => {
				Recipe.create({
					title: 'comida',
					summary: 'text here',
					image: 'textoplano',
				})
					.then(() => done(new Error('It requires a valid image')))
					.catch(() => done());
			});
			it('Deberia guardar los datos cuando es url', function () {
				let recipe = Recipe.build({
					title: 'comida',
					summary: 'text here',
					image: 'http://wwww.google.com',
				});
				expect(recipe.image).to.equal('http://wwww.google.com');
			});
		});
	});
});
