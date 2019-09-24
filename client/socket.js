import io from 'socket.io-client';
import store from './store';
import {
  gotSingleComment,
  gotSingleThreadComment,
  removeComment,
  removeThreadComment,
} from './actions/comments';
import { socketAuth } from './actions/authentication';

const socket = process.env.SOCKET_URL ? io(process.env.SOCKET_URL) : io();

socket.on('message-thread', comment => {
  store.dispatch(gotSingleThreadComment(comment));
});

socket.on('message-thread-error', ({ threadId, id }) => {
  store.dispatch(removeThreadComment(threadId, id));
});

socket.on('message', comment => {
  store.dispatch(gotSingleComment(comment));
});

socket.on('message-error', ({ id }) => {
  store.dispatch(removeComment(id));
});

socket.on('authenticated', () => {
  store.dispatch(socketAuth());
});

export default socket;
