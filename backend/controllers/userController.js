const mongoose = require('mongoose')
const userModel = require('../models/userModel');

// login user
const loginUser = async (req, res) => {

    res.json({ mssg: 'login user' })
}

// signup user
const signupUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.signup(email, password);
        res.status(200).json({ user })
    }
    catch (error) {
        res.status(400).json({ error: error.message })
        console.log(error);
    }
}

module.exports = { loginUser, signupUser };