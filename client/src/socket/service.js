import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const SocketService = {
  subscribeToTimer(callback) {
    socket.on('timer', timestamp => callback(null, timestamp));
    socket.emit('subscribeToTimer', 1000);
  },

  sendMessage(message, callback) {
    socket.on('message', message => callback(null, message));
    socket.emit('sendMessage', message);
  }
};

export default SocketService;
