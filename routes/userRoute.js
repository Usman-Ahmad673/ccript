const express = require('express')
const { loginUser, getAppointments, refreshToken } = require('../controller/userController')
const {isAuthenticatedUser} = require('../middleware/Auth')

const router = express.Router()



router.route('/login').post(loginUser);
router.route('/appointments').get(isAuthenticatedUser, getAppointments); // Use the middleware for protected routes
router.route('/refresh-token').post(refreshToken);


module.exports = router