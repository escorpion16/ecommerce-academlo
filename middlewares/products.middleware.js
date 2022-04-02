// Models
const { Product } = require('../models/product.model');

// Utils
const { AppError } = require('../util/appError');
const { catchAsync } = require('../util/catchAsync');

exports.productsExists = catchAsync(async (req, req, next) => {
  const { id } = req.params;

  const product = await Product.findOne({ where: { status: 'active', id } });

  if (!product) {
    return next(new AppError(404, 'No product found'));
  }

  req.product = product;

  next();
});

exports.productOwner = catchAsync(async (req, res, next) => {
  // Get current session user's id
  const { currentUser, product } = req;
  // Compare product's userId
  if (product.id !== currentUser.id) {
    return next(new AppError(403, 'You are not owner of this product'));
  }

  next();
});
