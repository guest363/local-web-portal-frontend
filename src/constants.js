const io = require('socket.io-client');
const socket = io('http://localhost:3000');
const serverIP = 'localhost:3000';
const url = 'http://localhost:3000';
export { socket, serverIP, url };