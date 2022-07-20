const socket = io()

var name;
let textarea = document.querySelector('#text')
let messageAria = document.querySelector('.messagearia')

do{
  name = prompt('Please Enter Name')
}while(!name)


textarea.addEventListener('keyup',(e) => {
    if(e.key === 'Enter'){
        sendMessage(e.target.value)
    }
})


function sendMessage(message){
  let msg = {
    user:name,
    message:message.trim()
  }

  // append message

   appendMessage(msg,'outgoing')
   textarea.value = ''
   scrollToBottom()

  // send to server

    socket.emit('message',{
      user:name,
      message:message.trim()
    })
}

 function appendMessage(msg,type){
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className,'message')


    let markup = `
     <h4>${msg.user}</h4>
     <p>${msg.message}</p>
    `

    mainDiv.innerHTML = markup

    messageAria.appendChild(mainDiv)
}



//Recive Message

socket.on('message',(msg) => {
  console.log(msg)
  appendMessage(msg,'incoming')
  scrollToBottom()

})


function scrollToBottom(){
  messageAria.scrollTop = messageAria.scrollHeight
}