const express = require('express');

const User = require('./user-model.js');
const restrict = require('../authorization/auth-middleware.js');

const router = express.Router();

router.get('/', restrict, (req, res) => {
    User.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => res.send(err));
});

module.exports = router;