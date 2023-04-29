const router = require('express').Router();
 const apiRoutes = require('./api/index.js');
//const productRoutes = require('./api/product-routes')

 router.use('/api', apiRoutes);
//router.use('/api/productRoutes', productRoutes);


router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>")
});

module.exports = router;

