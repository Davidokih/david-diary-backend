const express = require('express');
const router = express.Router();

const { getAllUser, getOneUser, signInUser } = require('../controller/userController');

router.route('/user').get(getAllUser);
router.route('/user/signIn').post(signInUser);
router.route('/:userid').get(getOneUser);

module.exports = router;