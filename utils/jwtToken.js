const jwt = require('jsonwebtoken');

const sendToken = (user, statusCode, res) => {
    const token = user.getJWTToken();


    res.cookie('token', token, {
        expires: new Date(Date.now() + 30 * 1000),
        httpOnly: true,
    });


    console.log(`Token from JWTToken.js: ${token}`);

    res.status(statusCode).json({
        success: true,
        user,
        token,
    });
};

module.exports = sendToken;
