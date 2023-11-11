const jwt = require('jsonwebtoken');

const sendToken = (user, statusCode, res) => {
    const token = user.getJWTToken();

    // Set the Bearer token in the Authorization header
    res.setHeader('Authorization', `Bearer ${token}`);

    // Set the token as a cookie with a 30-second expiration
    res.cookie('token', token, {
        expires: new Date(Date.now() + 30 * 1000), // Set expiration to 30 seconds
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
