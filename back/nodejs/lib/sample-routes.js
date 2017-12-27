const express = require('express');
const Game = require('./game');
const moment = require('moment');
const Repository = require('./repository');
const _ = require('lodash');

const register = () => {

    const router = express.Router();

    /**
     * @swagger
     * /sample/perfect:
     *   get:
     *     tags:
     *       - Samples
     *     description: Create a perfect game
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: player
     *         in: query
     *         required: false
     *     responses:
     *       200:
     *         description: Game Result
     *         schema:
     *           $ref: '#/definitions/GameResult'
     */
    router.get('/sample/perfect', (req, res) => {
        let startedDate = new Date();
        const started_at = startedDate.toISOString();
        const body = {
            questions: 150,
            started_at,
            frames: [],
            player: req.query.player || 'player',
        };
        for (let i = 0; i < body.questions; i++) {
            const frame = {
                answered_at: moment(startedDate).add(i + 1, 'seconds').toISOString(),
                player_answer: 1,
                valid_answer: 1,
            };
            body.frames.push(frame);
        }
        const game = new Game(body);
        return Repository.saveGame(game)
        .then(() => res.json(game.detail));
    });

    /**
     * @swagger
     * /sample/random:
     *   get:
     *     tags:
     *       - Samples
     *     description: Create a random game
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: player
     *         in: query
     *         required: false
     *     responses:
     *       200:
     *         description: Game Result
     *         schema:
     *           $ref: '#/definitions/GameResult'
     */
    router.get('/sample/random', (req, res) => {
        let startedDate = new Date();
        const started_at = startedDate.toISOString();
        const body = {
            questions: 150,
            started_at,
            frames: [],
            player: req.query.player || `player-${new Date().getTime()}`,
        };
        for (let i = 0; i < body.questions; i++) {
            const frame = {
                answered_at: moment(startedDate).add(i + 1, 'seconds').toISOString(),
                player_answer: parseInt(Math.random() * 10) % 2,
                valid_answer: 1,
            };
            body.frames.push(frame);
        }
        const game = new Game(body);
        return Repository.saveGame(game)
        .then(() => res.json(game.detail));
    });

    return router;
};

module.exports = { register };
