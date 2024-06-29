const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const app = require('../app');

router.get('/', userController.findAll);
router.post('/', userController.create);
router.post('/login', userController.login)
router.patch('/:username', userController.update);
router.delete('/:username', userController.delete);


module.exports = router;