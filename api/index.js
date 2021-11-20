//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn, Diet } = require('./src/db.js');

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
	server.listen(3001, () => {
		console.log('%s listening at 3001');

		const dietGlutenFree = Diet.create({
			name: 'gluten free',
		});
		const dietDairyFree = Diet.create({
			name: 'dairy free',
		});
		const dietPaleolithic = Diet.create({
			name: 'paleolithic',
		});
		const dietVegetarian = Diet.create({
			name: 'vegetarian',
		});
		const dietOvo = Diet.create({
			name: 'ovo',
		});
		const dietLacto = Diet.create({
			name: 'lacto',
		});
		const dietPrimal = Diet.create({
			name: 'primal',
		});
		const dietVegan = Diet.create({
			name: 'vegan',
		});
		const dietPescatarian = Diet.create({
			name: 'pescetarian',
		});
		const dietFruitarian = Diet.create({
			name: 'frutarian',
		});

		Promise.all([
			dietGlutenFree,
			dietDairyFree,
			dietPaleolithic,
			dietVegetarian,
			dietOvo,
			dietLacto,
			dietPrimal,
			dietVegan,
			dietPescatarian,
			dietFruitarian,
		]).then(res => {
      console.log('Diets precargadas.')
    })
		// eslint-disable-line no-console
	});
});
