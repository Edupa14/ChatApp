var socket = io.connect('http://192.168.0.12:6677', {'forceNew':true})

socket.on('messages', function(data){
    // console.log(data);
    render(data)
})
function render(data){
    var html = data.map(function(message, index){
        return (`
        <div class="message">
            <strong>${message.Nombre}</strong>
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
        Mensaje: document.getElementById('text').value,
        Hora: hora(),
        Fecha: fecha()
    }
    document.getElementById('nickName').style.display = 'none'
    socket.emit('add-message', message)
    
    return false
}

// agregar 0 para numeros menores de 10
function validarTiempo(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
  
  function hora() {
    let hoy = new Date();
    let h = hoy.getHours();
    let m = hoy.getMinutes();
    let s = hoy.getSeconds();
    m = validarTiempo(m);
    s = validarTiempo(s);
    let hora = h + ":" + m + ":" + s;
    return hora;
  }

  function fecha() {
    let d = new Date(),
        mes = '' + (d.getMonth() + 1),
        dia = '' + d.getDate(),
        anio = d.getFullYear();
    dia = validarTiempo(dia);
    mes = validarTiempo(mes);

    return [anio, mes, dia].join('-');
}
