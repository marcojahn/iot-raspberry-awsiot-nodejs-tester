import express from 'express';
import bodyParser from 'body-parser';
import winston from 'winston';
import expressWinston from 'express-winston';
import healthcheck from 'healthcheck-middleware';

import awsDevice from './aws-iot.connect';

const app = express();

const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)()
  ]
});

// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

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

app.use('/healthcheck', healthcheck());

const server = (device) => {
  app.get('/', (req, res) => {
    res.send('hello world');
  });

  app.post('/generic/endpoint', (req, res) => {
    if (!req.body) return res.sendStatus(400);
    logger.info('post body');
    logger.info(req.body);
    device.publish('topic_1', JSON.stringify(req.body));
    res.status(200).send({status: 'ok'});
  });

  app.listen(3000, () => {
    logger.info('listening on port 3000');
  });
  return app;
};

// const device = awsDevice(logger);
// device.subscribe('topic_1');

// server(device);
