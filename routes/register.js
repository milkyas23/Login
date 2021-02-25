const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const registercontroller = require('../controllers/Registercontroller');

/* GET Login form. */
router.get('/', registercontroller.show);

/* GET topsecret page. */
router.post('/',
  body('username').notEmpty().trim().toLowerCase(),
  body('email').notEmpty().isEmail().trim().toLowerCase(),
  body('password').notEmpty(),
  body('passwordconfirmation').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match password');
    }
    // Indicates the success of this synchronous custom validator
    return true;
  }),
  registercontroller.store
);

module.exports = router;
