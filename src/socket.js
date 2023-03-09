import { connect } from 'socket.io-client';

export const Socket = () => {
  const socket = connect('http://11.30.11.215:8086', {
    transports: ['websocket'],
  });

  socket.on('connect', function () {
    console.log('Client has connected to the server');
  });

  socket.on('disconnect', function () {
    console.log('The client has disconnected!');
  });

  return socket;
};
