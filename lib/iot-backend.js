import express from 'express';
import winston from 'winston';
import expressWinston from 'express-winston';

const app = express();

app.use(expressWinston.logger({
    transports: [
        new winston.transports.Console({
            json: false,
            colorize: true
        })
    ],
    meta: false,
    expressFormat: true
}));

const server = () => {
    app.get('/', (req, res) => {
        res.send('hello world');
    });

    app.listen(3000, () => {
        winston.log('listening on port 3000');
    });
    return app;
};

server();
