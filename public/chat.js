const socket = io();
// DOM Elements
let message = document.querySelector('#message');
let username = document.querySelector('#username');
let btn = document.querySelector('#send');
let output = document.querySelector('#output');
let actions = document.querySelector('#actions');

btn.addEventListener('click', () => {
  socket.emit('client:message', {
    username: username.value,
    message: message.value
  });
});

message.addEventListener('keypress',()=>{
  socket.emit('client:typing', username.value)
})

socket.on('client:message', (data) => {
  output.innerHTML += `<p>
  <strong>${data.username}</strong> : ${data.message}
  </p>`
})

socket.on('client:typing', (data)=>{
  actions.innerHTML = `<p>
  <em>${data} is typing...</em>
  </p>`
})