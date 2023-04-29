const router = require('express').Router();     //created a router varable and then grabbed the Router function from express
const { Category, Product } = require('../../models'); //

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id',]
    }
  })
    .then(products => {
      res.status(200).json(products);

      //res.send(products)
    })
    .catch(error => {
      res.status(500).json(error);
    });

});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Product
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Product
    }
  })
    .then(products => {
      res.status(200).json(products);

    })
    .catch(error => {
      res.status(500).json(error);
    });

});

router.post('/', async (req, res) => {
  // create a new categoryconst  //FIX THISSSS!!!!!
  try {
    const categoryConst = await Category.create(req.body);
    res.status(200).json(categoryConst);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(categoryData);

  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.findByPk(req.params.id, {

    })
    if (!categoryData) {
      res.status(404).json({ message: `No Category Data` })
      return
    }
    categoryData.destroy();
    res.status(200).json(categoryData);


  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
