const express = require('express');
const Repository = require('./repository');
const Handlebars = require('handlebars');
const moment = require('moment');
const requireText = require('require-text');
const leaderboardTemplate = requireText('./leaderboard.hbs', require);
const _ = require('lodash');
require('handlebars-intl').registerWith(Handlebars);

Handlebars.registerHelper('formatRank', index => {
    const rank = index + 1;
    const hundredRemainder = rank % 100;
    const tenRemainder = rank % 10;
    if (hundredRemainder - tenRemainder === 10) {
        return rank + "th";
    }
    switch (tenRemainder) {
        case 1:
            return rank + "st";
        case 2:
            return rank + "nd";
        case 3:
            return rank + "rd";
    }
    return rank + "th";
});

Handlebars.registerHelper('time', (elapsed_time) => moment(elapsed_time * 1000).format('mm:ss'));

Handlebars.registerHelper('accuracy', (accuracy) => {
    if (accuracy === 100) {
        return `<span class="badge badge-pill badge-danger">NO MISS</span>`;
    }
    return `${Math.round(accuracy, 2)}%`;
});

/**
 * @swagger
 * definitions:
 *   Entry:
 *     properties:
 *       player:
 *         type: string
 *       score:
 *         type: number
 *       elapsed_time:
 *         type: number
 *         format: date-time
 *
 *   Leaderboard:
 *     type: array
 *     items:
 *       $ref: '#/definitions/Entry'
 */

const register = () => {

    const router = express.Router();

    /**
     * @swagger
     * /leaderboard:
     *   get:
     *     tags:
     *       - Leaderboard
     *     description: Get current leaderboard
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Leaderboard
     *         schema:
     *           $ref: '#/definitions/Leaderboard'
     */
    router.get('/leaderboard', (req, res) => Repository.getLeaderboard().then(leaderboard => res.json(leaderboard)));

    /**
     * @swagger
     * /leaderboard/html:
     *   get:
     *     tags:
     *       - Leaderboard
     *     description: Get current leaderboard as html
     *     produces:
     *       - application/html
     */
    router.get('/leaderboard/html', (req, res) => Repository.getLeaderboard().then(leaderboard => res.send(Handlebars.compile(leaderboardTemplate)(leaderboard))));

    /**
     * @swagger
     * /leaderboard/:year/:month/:day:
     *   get:
     *     tags:
     *       - Leaderboard
     *     description: Get current leaderboard
     *     parameters:
     *       - name: year
     *         in: path
     *         required: true
     *       - name: month
     *         in: path
     *         required: true
     *       - name: day
     *         in: path
     *         required: true
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Leaderboard
     *         schema:
     *           $ref: '#/definitions/Leaderboard'
     */
    router.get('/leaderboard/:year/:month/:day', (req, res) => {
        const year = req.params.year;
        const month = req.params.month;
        const day = req.params.day;
        return Repository.getLeaderboardAt(year, month, day)
        .then(leaderboard => res.json(leaderboard));
    });

    /**
     * @swagger
     * /leaderboard/:year/:month/:day/html:
     *   get:
     *     tags:
     *       - Leaderboard
     *     description: Get leaderboard at a specific date as HTML
     *     parameters:
     *       - name: year
     *         in: path
     *         required: true
     *       - name: month
     *         in: path
     *         required: true
     *       - name: day
     *         in: path
     *         required: true
     *     produces:
     *       - application/html
     */
    router.get('/leaderboard/:year/:month/:day/html', (req, res) => {
        const year = req.params.year;
        const month = req.params.month;
        const day = req.params.day;
        return Repository.getLeaderboardAt(year, month, day)
        .then(leaderboard => res.send(Handlebars.compile(leaderboardTemplate)(leaderboard)));
    });

    return router;
};

module.exports = { register };
