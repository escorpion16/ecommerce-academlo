const express = require('express');

// Controller
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  disableProduct
} = require('../controllers/products.controller');

// Middlewares
const { validateSession } = require('../middlewares/auth.middleware');
const {
  productsExists,
  productOwner
} = require('../middlewares/products.middleware');
const {
  createProductValidations,
  validationResult
} = require('../middlewares/validators.middleware');

const router = express.Router();

router.use(validateSession);

router
  .route('/')
  .get(getAllProducts)
  .post(createProductValidations, validationResult, createProduct);

router
  .use('/:id', productsExists)
  .route('/:id')
  .get(getProductById)
  .patch(productOwner, updateProduct)
  .delete(productOwner, disableProduct);

module.exports = { productsRouter: router };
