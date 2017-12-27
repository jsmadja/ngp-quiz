const config = require('config');
const Server = require('./lib/server');

const server = new Server(config);
const app = server.configure();

module.exports = new Promise((resolve, reject) => {
    app.listen(config.get('server.port'), config.get('server.host'), err => {
        if (err) {
            reject(err);
            console.error(err);
            process.exit(1);
        }
        console.log('Server starting...');
        console.log(`Process environment is '${process.env.NODE_ENV}'`);
        console.log(`Api started at ${config.get('server.host')}:${config.get('server.port')}`);
        resolve(app);
    });
});

process.on('unhandledRejection', r => console.error(r));
process.on('uncaughtException', r => console.error(r));
