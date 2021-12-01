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
conn.sync( { force: false }  ).then(() => {
	server.listen(3001, () => {
		console.log('%s listening at 3001');

		Diet.sync( {force: true }).then(() => {
			Diet.create({
				name: 'gluten free',
			});
			Diet.create({
				name: 'dairy free',
			});
			Diet.create({
				name: 'paleolithic',
			});
			Diet.create({
				name: 'vegetarian',
			});
			Diet.create({
				name: 'primal',
			});
			Diet.create({
				name: 'vegan',
			});
			Diet.create({
				name: 'pescetarian',
			});
			Diet.create({
				name: 'frutarian',
			});
		}).then(() => console.log('Diets precargadas.'))
		// eslint-disable-line no-console
	});
}); 
