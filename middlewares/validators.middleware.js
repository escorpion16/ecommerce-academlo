const { body, validationResult } = require('express-validator');

// Utils
const { catchAsync } = require('../util/catchAsync');
const { AppError } = require('../util/appError');

// Products validations
exports.createProductValidations = [
  body('title')
    .isString()
    .withMessage('Title must be string')
    .notEmpty()
    .withMessage('Must provide a valid title'),
  body('description')
    .isString()
    .withMessage('Description must be string')
    .notEmpty()
    .withMessage('Must provide a valid description'),
  ,
  body('quantity')
    .isNumeric()
    .withMessage('Quantity must be a number')
    .custom((value) => value > 0)
    .withMessage('Quantity must be greater than 0'),
  body('price')
    .isNumeric()
    .withMessage('Price must be a number')
    .custom((value) => value > 0)
    .withMessage('Price must be greater that 0')
];

// END: Products validations

exports.validationResult = catchAsync(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMsg = errors
      .array()
      .map(({ msg }) => msg)
      .join('. ');
    return next(new AppError(400, errorMsg));
  }

  next();
});
