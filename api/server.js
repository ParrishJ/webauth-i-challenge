const express = require('express');
const helmet = require('helmet');
const cors = require('cors');


const authorizationRouter = require('../authorization/auth-router.js');
const userRouter = require('../users/user-router.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/users', userRouter);
server.use('/api/auth', authorizationRouter);

module.exports = server;