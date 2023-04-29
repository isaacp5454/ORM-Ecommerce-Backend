const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => { //is this async ?
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll();
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag, as: 'products' }]
    })
    if (!tagData) {
      res.status(404).json({ message: 'No tag data' })
      return
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
}
);

router.post('/', async (req, res) => {   // LEAVE THIS FOR LAST 
  // create a new tag
  try {
    const tagData = await Tag.create(req.body);
    if (req.body.productIds) {
      const productTagIdArr = req.body.productIds.map((product_id) => {
        return {
          tag_id: tagData.id,
          product_id,
        };
      });
      await ProductTag.bulkCreate(productTagIdArr);

    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    console.log(tagData);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});



// router.delete('/:id', async (req, res) => {
//   // delete on tag by its `id` value
//   try {
//     const tagData = await Tag.findByPk(req.params.id, {
//       include: [{ model: Product }, { model: Product, through: ProductTag, as: 'products' }]
//     })
//     if (!tagData) {
//       res.status(404).json({ message: 'No tag data' })
//       return
//     }
//     const productTagData = await ProductTag.findAll({
//       where:{tag_id: req.params.id}

//     })
//     const productTagIds = productTagData.map(({ tag_id }) => tag_id);
//     await ProductTag.destroy({ where: { id: productTagIds } });
//     await tagData.destroy();
//     res.status(200).json(tagData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: { model: Product, through: ProductTag, as: 'products' }
    })
    if (!tagData) {
      res.status(404).json({ message: 'No Tag Data' })
      return
    }
    tagData.destroy();
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }

});

module.exports = router;
