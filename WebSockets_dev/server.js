const express = require('express'); //requires express module
const socket = require('socket.io'); //requires socket.io module
const fs = require('fs');
const app = express();
var PORT = process.env.PORT || 3000;
const server = app.listen(PORT); //tells to host server on localhost:3000

const dataStorePath = './data.json';
const dataStore = require(dataStorePath)


//Playing variables:
app.use(express.static('public')); //show static files in 'public' directory
console.log('Server is running');
const io = socket(server);

var count = dataStore[0].count;

console.log(count);


//Socket.io Connection------------------
io.on('connection', (socket) => {

    console.log("New socket connection: " + socket.id)

    socket.on('counter', () => {
        count++;
        console.log(count)
        io.emit('counter', count);

        dataStore[0].count = count;

        fs.writeFile(dataStorePath,JSON.stringify(dataStore),error=>{
           if(error) throw error;
           console.log("updated");
        })

    })

    socket.on('getCount',()=>{
        console.log("getCount called. count: "+ count)
        io.emit('currentCount',count)
    })
})

io.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
  });