const express = require('express');
const router = express.Router();
const movieController = require('../controller/movies');
const userController = require('../controller/user');
const verify = require('../utils/middleware');
const { check } = require('express-validator');

router.post('/register', 
    check('username').isEmail()
    .withMessage('must be valid mail'), 
    check('password')
    .isLength({ min: 5 })
    .withMessage('must be at least 5 chars long'), 
    userController.registration);
router.post('/login', 
    check('username').isEmail()
    .withMessage('must be valid mail'), 
    check('password').notEmpty()
    .isLength({ min: 5 })
    .withMessage('must be valid password'), 
    userController.login);
router.post('/movie/add', verify.authenticateJWT, movieController.addMovies);
router.get('/movie', verify.authenticateJWT, movieController.getMovies);
router.put('/movie/:id', verify.authenticateJWT, movieController.editMovies);
router.post('/movie/:id', verify.authenticateJWT, movieController.deleteMovies);

module.exports = router;