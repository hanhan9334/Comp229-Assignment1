const jwt = require('jsonwebtoken');
const { Error } = require('mongoose');
const User = require('../models/user')


const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, 'Thisismyproject');
        const user = await User.find({ _id: decoded._id, 'tokens.token': token });
        console.log(user);
        if (!user[0]) {
            throw new Error;
        }

        req.token = token;
        req.user = user[0];
        next()
    } catch (e) {
        res.status(401).send({ error: "Please authenticate." })
    }
}

module.exports = auth;