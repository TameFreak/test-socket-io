import io from 'socket.io-client';

import { config, socketEvents } from '../../shared';

const socket = io.connect(`http://localhost:${config.SOCET_PORT}`);

const chatList = document.querySelector('.chat-list');
const chatInput = document.querySelector('.chat-input');

const ENTER_KEY_CODE = 13;

socket.on(socketEvents.GET_MESSAGES, ({ messages }) => {
    messages.forEach(message => {
        addMessage(message);
    });
});

socket.on(socketEvents.ADD_NEW_MESSAGE, ({ message }) => {
    addMessage(message);
});

chatInput.addEventListener('keypress', event => {
    if (event.keyCode === ENTER_KEY_CODE) {
        socket.emit(socketEvents.SEND_MESSAGE, chatInput.value);
        chatInput.value = '';
    }
});

function addMessage(message) {
    chatList.appendChild(createMessage(message));
}

function createMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.innerText = message;
    return messageDiv;
}
