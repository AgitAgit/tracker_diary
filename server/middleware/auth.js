const express = require('express')
const User = require('../models/user')

//find a template @ IITC/2024-12/business-finder-app  /server/src/controllers/usersController.js and /server/src/middleware/authUser.js

async function authUser(req, res, next) {
    try {
        req.user = { username: "test" }
        const doc = await User.findOne({ user_name: req.user.username }, {_id:1})
        req.user.id = doc._id
        // console.log(req.user.id)
        next();
    } catch (error) {
        console.log(error)
    }
}

module.exports = authUser