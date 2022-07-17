const socket = io('/');
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container")
// var audio = new Audio('')
const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    document.querySelector(".container").appendChild(messageElement);
  //   if(position == 'left'){
  //   audio.play();
  // }
  }


const name1 = prompt("Enter your name1 to join");
socket.emit('new-user-joined',name1);

socket.on('user-joined',name1 =>{
  append(`${name1} joined the chat`,'right')
})

socket.on('receive',data =>{
  append(`${data.name}:${data.message}` , 'left')
})

socket.on('left',name1=>{
  append(`${name1} left the chat`,'right')
})
document.getElementById('submit').addEventListener("click",()=>{
  console.log("kr rha hu")
    const message = messageInput.value;
    append(`You:${message}`,'right');
    socket.emit('send',message);
    messageInput.value = ''
})