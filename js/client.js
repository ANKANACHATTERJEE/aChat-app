var socket = io('http://localhost:3000', { transports: ['websocket', 'polling', 'flashsocket'] });
const form = document.getElementById('send-message');
const msg = document.getElementById('msg');
const container = document.querySelector('.chat-box');

var audio = new Audio('notification_sound.mp3');

const naam = prompt("Enter your name to join!");
socket.emit('new-user-joined',naam); 

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if(msg.value!=''){
    append(`You`,`${msg.value}`,'right');
    socket.emit('send',`${msg.value}`);
    msg.value=``;}
})

const append = (name,message,position) => {
    const msgElement = document.createElement('div');
    msgElement.innerHTML = `
    <h6>${name}</h6>
    <p class="bg-dark">${message}</p>
    `;
    msgElement.classList.add('message');
    msgElement.classList.add(position);
    container.append(msgElement);
    if(position=='left'){
        audio.play();
    }
}

const appendProcess = (message,position) => {
    const msgElement = document.createElement('div');
    msgElement.innerHTML = `
    <p class="bg-primary py-0" style="margin:auto;">${message}</p>
    `;
    msgElement.classList.add('message');
    msgElement.classList.add(position);
    container.append(msgElement);
}



socket.on('user-joined',name => {
    console.log('Yaay');
    appendProcess(`${name} joined`,'center');
})

socket.on('receive',info => {
    append(`${info.name}`,`${info.message}`,'left');
})

socket.on('left',name => {
    appendProcess(`${name} left`,'center');
})
