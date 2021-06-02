var express = require('express');
var socket = require('socket.io');

var PORT = process.env.PORT || 3000;

var app = express();


var server = app.listen(PORT);


var clientNum = 0;

const clientRooms = {};
const states = {};

app.use(express.static('public'));

//Socket Setup 
var io = socket(server);

io.on('connection', (socket)=> {
     console.log("New Socket connection: " + socket.id);
    
    socket.on('newGame',handleNewGame);
    function handleNewGame(){
      console.log("Some has started a new game"); 
      //clientNum = 1;
        //make game code
        let roomName = makeid(5);
        socket.emit('gameCode',roomName);
        socket.join(roomName);
        
        //show room size
        clientNum = io.sockets.adapter.rooms.get(roomName).size
        console.log("Number of clients in room " + roomName + " is " + clientNum);
    };
    
    //get player input game code and send to server
    socket.on('joinGame',joinNewGame);
    function joinNewGame(gameCode){
      console.log("Someone has joined a new game and wants access to: " + gameCode);  
      //clientNum++;
       socket.join(gameCode); //socket.broadcast.emit('sendPlayerNumber',clientNum);
        
       //show room size
        clientNum = io.sockets.adapter.rooms.get(gameCode).size
        console.log("Number of clients in room " + gameCode + " is " + clientNum);
        
        //send player number back to clients
        io.to(gameCode).emit('sendPlayerNumber',clientNum);
        io.to(socket.id).emit('sendPlayerNumbertoPlayer',clientNum);
    };
    
    socket.on('getData',getPlayerMoveData);
    function getPlayerMoveData(dataIn){
      console.log("Move horse " + dataIn.player + " by " + dataIn.score + "to room" + dataIn.roomName); 
        //emit score data back to main screen
        //socket.broadcast.emit('sendPlayerData',dataIn);
        io.to(dataIn.roomName).emit('sendPlayerData',dataIn);
        
    };
    
    socket.on('sendPlayersData',getHorseTracker);
    function getHorseTracker(horseTrack){
        console.log("HOrse tracker array");
        console.log(horseTrack);
        io.to(horseTrack[0].room).emit('receiveHorseTrack',horseTrack);
    }
    
   /* socket.on('getNewHorseData',(clientDataIn)=>{
        io.to(dataIn.roomName).emit('setNewHorse',clientDataIn);
    });*/
});


function makeid(length){
    var result = '';
    //var characters = "ABCDEFGHIJKLMNOPQRSTUWXYZabcdefghijklmnopqrstuwxyz0123456789";
    var characters = "0123456789";
    var charLength = characters.length;
    for(var i=0; i<length; i++){
        result += characters.charAt(Math.floor(Math.random() * charLength));
    }
    return result;
}