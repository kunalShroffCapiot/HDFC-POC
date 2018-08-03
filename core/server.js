const http = require('http');

const debug = require("debug");

const app = require('./app');

const port = process.env.port || 3000;

app.set('port', port);

const server = http.createServer(app);

server.listen(port);
