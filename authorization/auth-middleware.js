const bcrypt = require('bcryptjs');

const User = require('../users/user-model');

module.exports = function restrict(req, res, next) {
    const { username, password } = req.headers;

    if (username && password) {
        User.findBy({ username })
            .first()
            .then(user => {
                if (user && bcrypt.compareSync(password, user.password)) {
                    next();
                } else {
                    res.status(401).json({ message: 'You Shall Not Pass!' });
                }
            })
            .catch(error => {
                res.status(500).json(error);
            });
    } else {
        res.status(400).json({ message: 'Please Enter Username and/or Password' })
    }
};