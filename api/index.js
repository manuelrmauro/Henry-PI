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
conn
	.sync({ force: false })
	.then(() => {
		server.listen(3001, () => {
			console.log('server listening at 3001');
			// eslint-disable-line no-console
		});
	})
	.then(() => {
		Diet.findOrCreate({
			where: {
				name: 'gluten free',
			},
		});
		Diet.findOrCreate({
			where: {
				name: 'dairy free',
			},
		});
		Diet.findOrCreate({
			where: {
				name: 'paleolithic',
			},
		});
		Diet.findOrCreate({
			where: {
				name: 'vegetarian',
			},
		});
		Diet.findOrCreate({
			where: {
				name: 'primal',
			},
		});
		Diet.findOrCreate({
			where: {
				name: 'vegan',
			},
		});
		Diet.findOrCreate({
			where: {
				name: 'pescetarian',
			},
		});
		Diet.findOrCreate({
			where: {
				name: 'frutarian',
			},
		});
	})
	.then(() => console.log('Diets precargadas.'));
