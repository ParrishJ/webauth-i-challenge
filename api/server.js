const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session)


const authorizationRouter = require('../authorization/auth-router.js');
const userRouter = require('../users/user-router.js');

const server = express();

const sessionConfig = {
    name: 'magicalMystery',
    secret: 'secret!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxage: 1000 * 60 * 15,
        secure: false,
        httpOnly: true
    },
    store: new KnexSessionStore({
        knex: require('../data/dbConfig.js'),
        tablename: 'sessions',
        sidfieldname: 'sid',
        createtable: true,
        clearInterval: 1000 * 60 * 20,
    }),
};

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

server.use('/api/users', userRouter);
server.use('/api/', authorizationRouter);

module.exports = server;