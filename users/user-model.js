const db = require('../data/dbConfig.js');

module.exports = {
    find,
    findBy,
    findById,
    register
};

function find() {
    return db('users').select('id', 'username', 'password');
}

function findBy(param) {
    return db('users').where(param)
}

function findById(id) {
    return db('users')
        .where({ id })
        .first();
}

function register(user) {
    return db('users')
        .insert(user, 'id')
        .then(ids => {
            const [id] = ids;
            return findById(id)
        });
}