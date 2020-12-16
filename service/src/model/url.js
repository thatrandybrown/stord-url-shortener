const { DataTypes, Model, Sequelize } = require("sequelize");
const config = require("../config.js");

const dbConfig = config.database.url
  ? [config.database.url, config.database]
  : [config.database];
const sequelize = new Sequelize(...dbConfig);

class URL extends Model {}
URL.init(
  {
    target: DataTypes.STRING,
    shortCode: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  { sequelize, modelName: "url" }
);

(async () => await sequelize.sync())();

module.exports = URL;
