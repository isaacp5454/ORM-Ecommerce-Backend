const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Category extends Model {}

Category.init(
  {
    // define columns
    id:{
      type: DataTypes.INTEGER,
      allowNull:false,
      autoIncrement:true, //automatically increases id for us, like sql.
      primaryKey:true,//the main value to get stuff from this table. primary bitch.
    },
    category_name:{
      type:DataTypes.STRING,
      allowNull:false,
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

module.exports = Category;
