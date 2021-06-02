const gameCodeInput = document.getElementById("gameCodeInput");

var newGameImg;
var joinGameImg;


var newGameBtn;
var joinGameBtn;

var splashBG;

function setupSplash(){
    /*newGameBtn = createButton('New Game');
    newGameBtn.position(355,474);
    newGameBtn.mousePressed(()=>{
       page = 1; 
    });
    
    joinGameBtn = createButton('Join Game');
    joinGameBtn.position(355,535);
    joinGameBtn.mousePressed(()=>{
       page = 2; 
    });*/
    
    newGameBtn = new Button(350,480,newGameImg);
    
    joinGameBtn = new Button(350,535,joinGameImg);
}

function showSplashScreen(){
    image(splashBG,0,0);
    
    newGameBtn.display();
    joinGameBtn.display();
    
    if(newGameBtn.buttonPressed()){
        socket.emit('newGame');
        page = 3;
    }else if(joinGameBtn.buttonPressed()){
        //socket.emit('joinGame');
        //page = 2;
        joinGame()
    }
}

function joinGame(){
    //console.log("Join a game");
    const code = gameCodeInput.value;
    clientData.roomName = code;
    socket.emit('joinGame',code);
    //startGame = true;
    print(code);
    page = 2; 
}