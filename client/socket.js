import io from 'socket.io-client';

const socket = process.env.SOCKET_URL ? io(process.env.SOCKET_URL) : io();

export default socket;
