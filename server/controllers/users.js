const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("./../models/user");
require('dotenv').config();
const secretKey = process.env.JWT_SECRET_KEY

async function login(req, res, next) {
    try {
        const { username, password } = req.body;
        if (!username || !password)
            return res
                .status(400)
                .json({ message: "email and password are required...", login: false });
        const storedUser = await User.findOne({ user_name: username }); //check if the user exists and extract it from the db
        if (!storedUser)
            return res.json({ message: `could not find user '${username}'`, login: false });
        const isValid = bcrypt.compareSync(password, storedUser.password); //use bcrypt to test if the login password matches the stored one
        if (!isValid)
            return res.json({ message: "Invalid password...", login: false });
        const token = jwt.sign(
            //generate a jwt token with payload containing the mongo id, name, email, and user plan. 
            {
                user: {
                    _id: storedUser._id,
                    username: storedUser.user_name
                },
            },
            secretKey,
            { expiresIn: "1h" }
        );
        res.status(200)
            .cookie("jwt", token)
            .json({ message: `User '${username}' logged in successfully.`, login: true, user: storedUser, token: token });
    } catch (error) {
        next(error);
    }
}

module.exports = { login }