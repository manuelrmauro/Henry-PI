const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define(
		'recipe',
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
				allowNull: false,
			},
			title: {
				type: DataTypes.STRING(50),
				allowNull: false,
				validate: {
					is: /^[a-zA-Z\ áéíóúÁÉÍÓÚñÑ\s]*$/i,
				},
			},
			summary: {
				type: DataTypes.TEXT,
				allowNull: false,
				validate: {
					not: /^[0-9]+$/i,
				},
			},
			spoonacularScore: {
				type: DataTypes.INTEGER,
				validate: {
					max: 100,
				},
			},
			healthScore: {
				type: DataTypes.INTEGER,
				validate: {
					max: 100,
				},
			},
			readyInMinutes: {
				type: DataTypes.INTEGER,
			},
			image: {
				type: DataTypes.STRING,
				validate: {
					isUrl: true,
				},
			},
			origin: {
				type: DataTypes.STRING,
			}
		},
		{
			timestamps: true,
		}
	);
};
