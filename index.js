const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));

const server = () => {
  app.get('/', (req, res) => {
    res.send('hello world');
  });

  app.listen(3000, () => {
    console.log('listening on port 3000');
  });
  return app;
};

server();
