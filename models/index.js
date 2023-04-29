// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category);
// Categories have many Products
// Products belongToMany Tags (through ProductTag)
// Tags belongToMany Products (through ProductTag)
Category.hasMany(Product);

Product.belongsToMany(Tag, {
  
  through: {
    model: ProductTag,
    unique: false
  },
 
  as: 'tags'
});

Tag.belongsToMany(Product, {
 
  through: {
    model: ProductTag,
    unique: false
  },

  as: 'products'
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
