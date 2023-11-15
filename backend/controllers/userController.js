const mongoose = require('mongoose')
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
}

// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.login(email, password);

        const token = await createToken(user._id);

        res.status(200).json({ email, token })
    }
    catch (error) {
        res.status(400).json({ error: error.message })
        console.log(error.message)
    }
}

// signup user
const signupUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.signup(email, password);

        const token = await createToken(user._id)

        res.status(200).json({ email, token })
    }
    catch (error) {
        res.status(400).json({ error: error.message })
        console.log(error);
    }
}

module.exports = { loginUser, signupUser };