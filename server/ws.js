const io = require('socket.io')();

io.on('connection', (client) => {
  client.on('subscribeToTimer', (interval) => {
    console.log(
      'client is subscribing to timer with an interval of',
      interval, 
      'milliseconds'
    );
    setInterval(() => {
      client.emit('timer', new Date());
    }, interval);
  });

  client.on('sendMessage', (message) => {
    client.emit('message', `You sent: ${message}`);
  });
});

module.exports = io;
