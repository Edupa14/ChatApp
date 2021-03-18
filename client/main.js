var socket = io.connect('http://192.168.0.12:6677', {'forceNew':true})

socket.on('messages', function(data){
    console.log(data);
    render(data)
})
function render(data){
    var html = data.map(function(message, index){
        return (`
        <div class="message">
            <strong>${message.Nombre} : dice</strong>
            <p>${message.Mensaje}</p>
        </div>
        `)
    }).join(' ')
    var div_msg = document.getElementById('messages')
    div_msg.innerHTML = html
    div_msg.scrollTop = div_msg.scrollHeight
}
function addMessage(e){
    let message ={
        Nombre: document.getElementById('nickName').value,
        Mensaje: document.getElementById('text').value
    }
    document.getElementById('nickName').style.display = 'none'
    socket.emit('add-message', message)
    
    return false
}