import express from 'express';
import { getParsedTaskFromText } from '../services/parseService.js';
import { body, validationResult } from 'express-validator';
const router = express.Router();

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};

const parseTextValidators = [
  body('text')
    .isString()
    .withMessage('Text must be a string')
    .notEmpty()
    .withMessage('Text is required'),
];

router.post(
  '/',
  parseTextValidators,
  handleValidationErrors,
  getParsedTaskFromText
);

export default router;
