const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError = require('../middleware/catchAsyncError')
const User = require('../model/userModel')
const sendToken = require('../utils/jwtToken')
const jwt = require('jsonwebtoken');

//Register a User
exports.registerUser = catchAsyncError( async(req,res,next) => {
    
    const {name,email,password} = req.body
    const user = await User.create({
        name,email,password,
    })

    sendToken(user,201,res)
})


// Login User
exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { name, password } = req.body;

    if (!name || !password) {
        return next(new ErrorHandler("Please Enter Name & Password", 400));
    }

    const user = await User.findOne({ name });

    if (!user) {
        return next(new ErrorHandler("Invalid Name & Password", 401));
    }

    const isPasswordMatched = user.password === password;

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Name & Password", 401));
    }

    sendToken(user, 200, res);
});

// Appointments
exports.getAppointments = catchAsyncError(async (req, res, next) => {
    res.status(200).json({
        success: true,
        appointments: ["appointment1", "appointment2"],
    });
});



//Referesh Token
exports.refreshToken = catchAsyncError(async (req, res, next) => {
    const currentToken = req.cookies.token;

    console.log('Token Before Refreshing The Token');

    console.log(currentToken);

    if (!currentToken) {
        return next(new ErrorHandler("Token not provided", 401));
    }

    try {
        console.log('1');
        const decodedData = jwt.verify(currentToken, 'asdfghjklzxcvbnmqwertyuiopasdfgh');
        console.log(decodedData);
        console.log('2');
        // Assuming you have a method to get the user based on the decoded data
        const user = await User.findById(decodedData.id);
        
        console.log('3');
        console.log(user);
        // Generate a new token with a renewed expiration time
        console.log('4');
        const newToken = user.getJWTToken();
        
        console.log('5');
        console.log(newToken);
        // Set the new token as a cookie
        console.log('6');
        res.cookie('token', newToken, {
            expires: new Date(Date.now() + 30 * 1000), // Set expiration to 30 seconds
            httpOnly: true,
        });
        
        console.log('7');
        res.status(200).json({
            success: true,
            token: newToken,
        });
    } catch (err) {
        // Handle JWT verification errors
        return next(new ErrorHandler("Invalid Token", 401));
    }
});