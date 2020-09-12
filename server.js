const express = require('express');
const characterRouter = require('./data/characters/characterRouter.js');
const showsRouter = require('./data/shows/showsRouter.js');
const helmet = require('helmet');

const server = express();

server.use(express.json());
server.use(helmet());

server.get("/", (res, req) => {
    res.statusCode(200).json({ message: "The server is online!"})
})

server.use('/api/shows', showsRouter)
server.use('/api/characters', characterRouter)
module.exports = server;
