const socket = io('http://localhost:8000');

const form = document.getElementById('forms');
const messageinp = document.getElementById('messainp');
const messagecontainer = document.querySelector('.container');

var audio = new Audio('Wood Plank Flicks.mp3');
const Name = prompt("Enter your name");

const append = (message,position)=>
{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messagecontainer.append(messageElement);
    if(position=='left')
    {
    audio.play();
    }
}
socket.emit('new-user-joined', Name);

socket.on('user-joined',Name=>{
append(`${Name} joined the chat`,'right');
})

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageinp.value;
    append(`You: ${message}`,'right');
    socket.emit('send',message);
    messageinp.value = '';
});
socket.on('recive',data=>{
    append(`${data.Name}:${data.message}`,'left');
});
socket.on('leave',Name=>{
    append(`${Name} left the chat`,'left');
})