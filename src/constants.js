const io = require('socket.io-client');
const serverName = `localhost`;
const serverIP = `${serverName}:3000`;
const url = `http://${serverIP}`;
const socket = io(`${url}`);
export { socket, serverIP, url };