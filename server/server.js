#!/usr/bin/env node

/**
 * Module dependencies.
 */

const db = require('./db');     // Database connection to MongoDB
const api = require('./api');   // Express REST API
const ws = require('./ws');     // Socket.IO WebSockets/AJAX long-polling instance
const debug = require('debug')('cra-eg-mern:server');
const http = require('http');

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '4000');
api.set('port', port);

console.log('Express REST API listening on port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(api);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);


const SOCKET_PORT = process.env.SOCKET_PORT || '5000';
ws.listen(SOCKET_PORT);

console.log('Socket.IO WebSockets listening on port', SOCKET_PORT);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
