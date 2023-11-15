const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

// static login method
userSchema.statics.login = async function (email, password) {
    if (!email || !password)
        throw Error('All fields must be filled')

    if (!validator.isEmail(email))
        throw Error('Invalid Email')

    const user = await this.findOne({ email })

    if (!user)
        throw Error('Email not found, please signup!')


    const match = await bcrypt.compare(password, user.password)

    if (!match)
        throw Error('Incorrect password')

    return user
}

// static signup method
userSchema.statics.signup = async function (email, password) {

    // validation
    if (!email || !password)
        throw Error('All fields must be filled')

    if (!validator.isEmail(email))
        throw Error('Invalid email')

    if (!validator.isStrongPassword(password))
        throw Error('Password not strong enough')

    const exists = await this.find({ email })

    if (!exists) {
        throw Error('Email already in use')
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ email, password: hash });

    return user;
}

module.exports = mongoose.model("User", userSchema);