import io from 'socket.io-client';
import store from './store';
import {
  gotSingleComment,
  gotSingleThreadComment,
  removeComment,
  removeThreadComment,
} from './actions/comments';

const socket = process.env.SOCKET_URL ? io(process.env.SOCKET_URL) : io();

socket.on('message-thread', comment => {
  console.log('thread comment', comment);
  store.dispatch(gotSingleThreadComment(comment));
});

socket.on('message-thread-error', ({ threadId, id }) => {
  console.log('thread error', threadId, id);
  store.dispatch(removeThreadComment(threadId, id));
});

socket.on('message', comment => {
  console.log('comment', comment);
  store.dispatch(gotSingleComment(comment));
});

socket.on('message-error', ({ id }) => {
  console.log('message error', id);
  store.dispatch(removeComment(id));
});

// for development
setTimeout(
  () =>
    socket.emit('join-room', {
      type: 'event',
      id: 'c70fd89f-f912-47f9-b741-66cc29c1d7fa',
    }),
  1000 * 30
);

export default socket;
