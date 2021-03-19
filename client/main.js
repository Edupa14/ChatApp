var socket = io.connect('http://192.168.0.12:6677', {'forceNew':true})

socket.on('messages', function(data){
    // console.log(data);
    render(data)
})
function render(data){
    var html = data.map(function(message, index){
        mensaje_propio = `
            <div class="message grid grid-cols-12">
                <div class="max-w-prose col-span-12 mensaje_chat_propio" >
                    <p>${message.Mensaje}</p>
                </div>
                <div class="col-span-12 justify-self-end">
                    <p class="m-1 text-sm font-bold hora">${message.Hora}</p>
                </div>
            </div>
            `

        mensaje_externo = `
            <div class="message grid grid-cols-12">
                <div class="name col-span-1 justify-self-end ">${message.Nombre.substr(0,2).toUpperCase()}</div>
                <div class="max-w-prose col-span-11 mensaje_chat   " >
                    <p><strong >${message.Nombre}</strong></p>
                    <p>${message.Mensaje}</p>
                </div>
                <div class="col-span-1"></div>
                <div class="col-span-11">
                    <p class="m-1 text-sm font-bold hora">${message.Hora}</p>
                </div>
            </div>
            `
        if(message.Nombre == document.getElementById('nickName').value){
            return mensaje_propio
        }else{
            return mensaje_externo
        }
    }).join(' ')
    var div_msg = document.getElementById('messages')
    div_msg.innerHTML = html
    div_msg.scrollTop = div_msg.scrollHeight
}
function addMessage(e){
    if(document.getElementById('nickName').value == "" || document.getElementById('nickName').value.length <= 5){
        document.getElementById("nickName").focus()
          return false;
    }
    if(document.getElementById('text').value == ""){
        document.getElementById("text").focus()
        return false;
    }
    let message ={
        Nombre: document.getElementById('nickName').value,
        Mensaje: document.getElementById('text').value,
        Hora: hora(),
        Fecha: fecha()
    }
    // document.getElementById('nickName').style.display = 'none'
    document.getElementById('text').value = ""
    socket.emit('add-message', message)
    
    return false
}
// function validarContenido(id){
//     if(document.getElementById(id).value == ""){
//         document.getElementById(id).focus()
//           return false;
//     }
// }

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
