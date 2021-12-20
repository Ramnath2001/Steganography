const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/token');

const registerUser = asyncHandler(async (req, res) => {
    const {fname, lname, email, password} = req.body;

    const userExits = await User.findOne({email});

    if(userExits){
        res.status(400);
        throw new Error("User Already Exists");
    }

    const user = await User.create({
        fname,
        lname,
        email,
        password
    });

    if(user){
        res.status(201).json({
            _id: user._id,
            fname: user.fname,
            lname: user.lname,
            email: user.email,
            token: generateToken(user._id)
        });
    }else{
        res.status(400);
        throw new Error("Error Occured");
    }
});


const authUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});
    
    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            fname: user.fname,
            lname: user.lname,
            email: user.email,
            token: generateToken(user._id)
        });
    }else{
        res.status(400);
        throw new Error("Invalid Email or Password");
    }


});


module.exports = { registerUser, authUser };