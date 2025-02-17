const router = require('express').Router();
const bcrypt = require('bcryptjs');

const User = require('../users/user-model.js');

router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 12);
    user.password = hash;

    User.register(user)
        .then(saved => {
            res.status(201).json(saved)
        })
        .catch(error => {
            res.status(500).json(error)
        });
});

router.post('/login', (req, res) => {
    let { username, password } = req.body;

    User.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                req.session.username = user.username;
                req.session.userid = user.id;
                res.status(200).json({ message: `User ${user.username}, id:${user.id}, Logged In` })
            } else {
                res.status(401).json({ message: 'You Shall Not Pass!' });
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.delete('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy();
    }
    res.status(200).json({ message: 'Logged Out' })
});

module.exports = router;