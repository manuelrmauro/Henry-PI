const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    // nombre
    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        isAlpha: true
      }
    },
    // resumen
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // puntuacion
    spoonacularScore: {
      type: DataTypes.DECIMAL,
    },
    // nivel de salubridad
    healthScore: {
      type: DataTypes.DECIMAL,
    },
    // tiempo de coccion
    readyInMinutes: {
      type: DataTypes.INTEGER,
    },
    image: {
      type: DataTypes.STRING,
    },

  });
};
