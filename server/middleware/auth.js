const express = require('express')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require('../models/user')
require('dotenv').config();
const secretKey = process.env.JWT_SECRET_KEY

//find a template @ IITC/2024-12/business-finder-app  /server/src/controllers/usersController.js and /server/src/middleware/authUser.js

// async function authUser(req, res, next) {
//     try {
//         req.user = { username: "test" }
//         const doc = await User.findOne({ user_name: req.user.username }, { _id: 1 })
//         req.user._id = doc._id
//         // console.log(req.user.id)
//         next();
//     } catch (error) {
//         console.log(error)
//     }
// }

function parseCookie(cookie) {
    try {
        let result = {};
        if (cookie) {
            // console.log("cookie: ", cookie);
            const cookies = cookie.split("; ");
            // console.log("cookies",cookies);
            cookies.forEach((cookie) => {
                const pair = cookie.split("=");
                result[`${pair[0]}`] = pair[1];
            });
            // console.log("cookie parser result:",result);
        }
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

async function authUser(req, res, next) {
    try {
        let token;
        let decoded;
        if (req.body && req.body.token) {
            token = req.body.token;
        }
        // else if(req.token){
        //     token = req.token;
        // }
        else if (req.headers.jwtAuthorization) {
            token = req.headers.jwtAuthorization;
        }
        else {
            const cookieObject = parseCookie(req.headers.cookie);
            token = cookieObject.jwt;
        }
        try {
            decoded = jwt.verify(token, secretKey);
        } catch (error) {
            return res.status(400).json({ 
                message: "invalid token...",
                token 
            });
        }
        req.user = decoded.user;
        // console.log("authUser says: request by user:", decoded.user);
        next();
    } catch (error) {
        next(error);
    }
}


module.exports = authUser