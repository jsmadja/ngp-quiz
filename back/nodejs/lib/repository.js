const Database = require('./database');
const Game = require('./game');

const Repository = {
    saveGame: (game) => {
        const detail = game.detail;
        return Database.query(`INSERT INTO Game (player, detail, score, elapsed_time) VALUES ('${detail.player}', '${JSON.stringify(detail)}', '${detail.score}', '${detail.elapsed_time}')`);
    },

    getLeaderboard: () =>
        Database.query(
        `
        SELECT
  DISTINCT
  game.player,
  score,
  elapsed_time,
  game.created_at,
  detail
FROM Game game INNER JOIN (
                            SELECT
                              player,
                              max(score) AS MaxScore,
                              max(created_at) AS created_at
                            FROM Game
                            WHERE YEAR(created_at) = YEAR(current_date) AND MONTH(created_at) = MONTH(current_date)
                            GROUP BY player
                          ) tm ON game.player = tm.player AND game.score = tm.MaxScore AND game.created_at = tm.created_at
ORDER BY score DESC, elapsed_time ASC
        `).then(leaderboard => {
            leaderboard.forEach(l => {
                const game = new Game(JSON.parse(l.detail));
                l.detail = game.detail;
                l.score = game.detail.score;
            });
            return leaderboard;
        }),

    getLeaderboardAt: (year, month, day) =>
        Database.query(
        `
        SELECT DISTINCT game.player, score, elapsed_time, created_at, detail
        FROM Game game INNER JOIN (
            SELECT player, max(score) AS MaxScore
            FROM Game
            WHERE YEAR(created_at) = ${year} AND MONTH(created_at) = ${month} AND DAY(created_at) = ${day}
            GROUP BY player
        ) tm ON game.player = tm.player AND game.score = tm.MaxScore
        ORDER BY score DESC, elapsed_time ASC
        `).then(leaderboard => {
            leaderboard.forEach(l => {
                const game = new Game(JSON.parse(l.detail));
                l.detail = game.detail;
                l.score = game.detail.score;
            });
            return leaderboard;
        }),
};

module.exports = Repository;