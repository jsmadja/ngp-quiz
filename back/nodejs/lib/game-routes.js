const express = require('express');
const Game = require('./game');
const Repository = require('./repository');

/**
 * @swagger
 * definitions:
 *   Game:
 *     properties:
 *       player:
 *         type: string
 *       questions:
 *         type: number
 *         description: "How many questions"
 *       started_at:
 *         type: string
 *         format: date-time
 *       frames:
 *         type: array
 *         items:
 *           $ref: '#/definitions/Frame'
 *
 *   Frame:
 *     properties:
 *       player_answer:
 *         type: string
 *       valid_answer:
 *         type: string
 *       answered_at:
 *         type: string
 *         format: date-time
 *
 *   GameResult:
 *     properties:
 *       player:
 *         type: string
 *       questions:
 *         type: number
 *         description: "How many questions"
 *       started_at:
 *         type: string
 *         format: date-time
 *       score:
 *         type: number
 *       frames:
 *         type: array
 *         items:
 *           $ref: '#/definitions/FrameResult'
 *       bonuses:
 *         type: array
 *         items:
 *           $ref: '#/definitions/Bonus'
 *       elapsed_time:
 *         type: number
 *         description: "Elapsed time in seconds"
 *
 *   FrameResult:
 *     properties:
 *       player_answer:
 *         type: string
 *       valid_answer:
 *         type: string
 *       critical:
 *         type: boolean
 *       score:
 *         type: number
 *       answered_at:
 *         type: string
 *         format: date-time
 *
 *   Bonus:
 *     properties:
 *       type:
 *         type: string
 *         enum: [NO_MISS]
 *       score:
 *         type: number
 *
 */

const register = () => {

    const router = express.Router();

    /**
     * @swagger
     * /game:
     *   post:
     *     tags:
     *       - Games
     *     description: Post Game Result
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: body
     *         in: body
     *         required: true
     *         schema:
     *           $ref: '#/definitions/Game'
     *     responses:
     *       200:
     *         description: Game Result
     *         schema:
     *           $ref: '#/definitions/GameResult'
     */
    router.post('/game', (req, res) => {
        if (!req.body.player) {
            return res.sendStatus(403);
        }
        const game = new Game(req.body);
        const detail = game.detail;
        return Repository.saveGame(game)
        .then(() => res.json(detail));
    });

    return router;
};

module.exports = { register };
