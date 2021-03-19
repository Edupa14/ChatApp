var express = require('express')
var app = express()
var server = require('http').Server(app)
var io = require('socket.io')(server)
const bodyParser = require('body-parser');
/* Conexion a MySQL*/
const mysql = require('mysql');


/* uso del archivo index dentro de la carpeta client como pagina de inicio estatica*/
app.use(express.static('client'))

// MySql
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3307,
    user: 'root',
    password: '',
    database: 'chat_app'
});


function getMensajes(){
    return new Promise(  function(resolve, reject) {
        var sql = 'SELECT * FROM mensajes';
         connection.query(sql, function (err, rows, fields) {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
}
function newMessage(data, ip){
    return new Promise(  function(resolve, reject) {
        var sql = 'INSERT INTO mensajes SET ?';
        const nuevoMensaje = {
            Mensaje: data.Mensaje,
            Nombre: data.Nombre,
            Hora: data.Hora,
            Fecha: data.Fecha,
            Ip: ip
          };
          connection.query(sql, nuevoMensaje, error => {
            if (error) return reject(err);
            resolve('Mensaje creado!');
          });
    });
}
 

/* Conexion al servidor con SocketIO */
io.on('connection', async function(socket){
    console.log("El equipo con la ip : "+ socket.handshake.address+" se ha conectado...");
    
    
    socket.emit('messages',  await getMensajes())

    socket.on('add-message', async function(data){
        newMessage(data, socket.handshake.address)
    io.sockets.emit('messages', await getMensajes())
    })
})


// Control de Servidor
server.listen(6677, function(){
    console.log('Servidor en Línea en http://localhost:6677')
})

// Control de Base de Datos
// connection.connect(error => {
//     if (error) throw error;
//     console.log('Conexión a Base de Datos Exitosa!');
// });