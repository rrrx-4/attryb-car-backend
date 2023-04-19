const User = require('../models/user');

const register = async (req, res) => {

    const user = await User.create({ ...req.body })

    const token = user.createJWT()

    res.status(200).json({ user: { user: user.name }, token })

}

const login = async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {

        console.log("Cannot be empty");
        return;
    }

    const user = await User.findOne({ email })

    if (!user) {

        console.log("signup first");
        return;
    }

    const isPasswordCorrect = await user.comparePassword(password)

    if (!isPasswordCorrect) {
        console.log("Invalid Credentials");
        return
    }

    const token = user.createJWT()

    res.status(200).json({ user: { user: user.name }, token })

}

module.exports = {
    register, login,
}
