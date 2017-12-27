const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

class Server {

    constructor(config) {
        this.config = config;
        this.app = express();
    }

    configure() {
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.registerRoutes();
        return this.app;
    }

    registerRoutes() {
        const routes = [
            require('./swagger'),
            require('./game-routes'),
            require('./sample-routes'),
            require('./leaderboard-routes')
        ];
        routes.map(route => route.register())
        .forEach(router => this.app.use(router));
    }
}

module.exports = Server;
