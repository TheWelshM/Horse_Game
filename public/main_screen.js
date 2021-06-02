var horse1Img = [];
var horse2Img = [];
var horse3Img = [];
var horse4Img = [];
var horse5Img = [];
var horse6Img = [];
var horse7Img = [];
var horse8Img = [];
var horse9Img = [];
var horse10Img = [];

var horseX;
var currentHorseImg;
var stopRun;
var backdropRace;

var horses = [];
var horseImages = [];


var horseTotal = 0;
var horseSpace; 

var bottomBarrier;

var startGameBtn;
var startGameImg;

var horseNames = ["Minella Times","Tiger Roll","One For Arthur","Rule the World","Many Clouds","Pineau De Re","Auroras Encore","Neptune Collonges","Ballabriggs","Don't Push It","Mon Mome","Comply or Die","Silver Birch","Numbersixvalverde","Hedgehunter","Amberleigh House","Monty's Pass","Bindaree","Red Marauder","Papillon","Earth Summit","Lor Gyllene","Rough Quest","Royal Athlete","Miinnehoma","Party Politcs"];

var horsePosition = {
    name: "",
    place: 1,
    xPos: 0
}
var horseTracker = [];




function setupMainScreen() {
    for(var i=0; i<12; i++){
        horse1Img[i].resize(144,107);
    }
    for(var i=0; i<12; i++){
        horse2Img[i].resize(144,107);
    }
    for(var i=0; i<12; i++){
        horse3Img[i].resize(144,107);
    }
    for(var i=0; i<12; i++){
        horse4Img[i].resize(144,107);
    }
    for(var i=0; i<12; i++){
        horse5Img[i].resize(144,107);
    }
    for(var i=0; i<12; i++){
        horse6Img[i].resize(144,107);
    }
    for(var i=0; i<12; i++){
        horse7Img[i].resize(144,107);
    }
    for(var i=0; i<12; i++){
        horse8Img[i].resize(144,107);
    }
    for(var i=0; i<12; i++){
        horse9Img[i].resize(144,107);
    }
    for(var i=0; i<12; i++){
        horse10Img[i].resize(144,107);
    }
    
    //horseSpace = int(360/horseTotal);
    
    horseImages = [horse1Img,horse2Img,horse3Img,horse4Img,horse5Img,horse6Img,horse7Img,horse8Img,horse9Img,horse10Img];
    
    /*for(var i=0;i<horseTotal;i++){
        
        horses[i] = new Horse(horseImages[Math.floor(Math.random() * 10)],130 + (i*horseSpace));
    }*/
    
    currentHorseImg = 0;
    horseX = 0;
    
    stopRun = setInterval(nextImg,100);
    
    startGameBtn = new Button(550,300,startGameImg);
}

function makeHorses(){
    horseSpace = int(360/horseTotal);
    for(var i=0;i<horseTotal;i++){
        horses[i] = new Horse(horseImages[i],130 + (i*horseSpace),i);
        horseTracker[i] = { player: i+1,
                            name: horseNames[i],
                            place: i+1,
                            xPos: 0,
                            room: gameCode
                          };
        //horseTracker[i].name = horseNames[i];
        //horseTracker[i].place = i;
    }
    print(horseTracker);
}

function drawPreGameScreen(){
    image(backdropRace,0,0);
    startGameBtn.display();
    //display game code
    fill(255);
    textSize(22);
    text(gameCode,160,30);
    //display total horses in game
    text(horseTotal,613,30);
    
    if(startGameBtn.buttonPressed()){
        makeHorses();
        page = 1;
        sendPlayersData();
    }
}

var gameCode; 

socket.on('gameCode',setGameCode);

function setGameCode(gameCodeIn){
    gameCode = gameCodeIn;
}


socket.on('sendPlayerNumber',setPlayerNumber);


function setPlayerNumber(horseNumIn){
    horseTotal = horseNumIn - 1;
    //clientData.player = horseNumIn - 1;
}



/*socket.on('setNewHorse', (newClientHorse) => {
    
});*/


function drawMainScreen() {
    background(200);
    image(backdropRace,0,0);
    
    //display game code
    textAlign(LEFT);
    fill(255);
    textSize(22);
    text(gameCode,160,30);
    
    //display total horses in game
    text(horseTotal,613,30);
    
    //display leader name
    text(horseTracker[0].name,880,30);
    
    /*if(currentHorseImg>11){
        
        clearInterval(stopRun);
        currentHorseImg = 0;
    };
    
    image(horseImg[currentHorseImg],horseX,250);*/
  // put drawing code here
    
    for(var i=0; i<horses.length;i++){
        horses[i].showHorse();
        horses[i].showHorseName();
    }
    
    image(bottomBarrier,0,0);
    
    
}

socket.on('sendPlayerData',getPlayerData);

function getPlayerData(dataIn){
    
    print("got some data from player " + dataIn.player);
    print("move " + dataIn.score);
    horses[dataIn.player - 1].moveHorse(dataIn.score);
    //set leaderboard
    for(var i=0; i<horseTracker.length;i++){
        if(horseTracker[i].player == dataIn.player){
            horseTracker[i].xPos += dataIn.score;
        }
    
    }
    //updateLeader();
}

function updateLeader(){
    print("Update leaderboard now please");
    //horseTracker.xPos.sort(function(a, b){return a-b});
    horseTracker.sort(function(a, b) {
    return parseFloat(b.xPos) - parseFloat(a.xPos);
    });
    for(var i=0; i<horseTracker.length;i++){
        horseTracker[i].place = i+1;
    }
    
    print(horseTracker);
    sendPlayersData();
}

function sendPlayersData(){
    socket.emit('sendPlayersData',horseTracker);
}


function nextImg(){
    //print(currentHorseImg);
    horseX += 10;
    currentHorseImg++;  
}

/*function mousePressed(){
    //stopRun = setInterval(nextImg,100);
    var randomNum = Math.floor(Math.random() * horses.length);
    
    print(randomNum);
    horses[randomNum].moveHorse();
}*/


class Horse{
    constructor(imgArray,y,player){
        this.images = imgArray;
        this.x = 0;
        this.currentImg = 0; 
        this.y = y;
        this.name = horseNames[player];
        this.moveBuffer = [];
        this.moveTrigger = false;
    }
    
    /*=*/
    
    showHorse(){
        this.startHorseMove();
        /*if(this.currentImg>11){
            clearInterval(this.stopRun);
            this.currentImg = 0;
            print(this.moveBuffer);
            this.moveBuffer.shift();
            print(this.moveBuffer);
        }*/
        image(this.images[this.currentImg],this.x,this.y);
    }
    
    moveHorse(xSize){
        
        if(this.moveBuffer < 1){
            this.moveTrigger = true;
        }
        
        //add movement to buffer
        this.moveBuffer.push(xSize);
        /*if(this.currentImg==0){
        this.stopRun = setInterval(() => {
            this.x += (xSize/5);
            this.currentImg++;
        },100);
        }*/
        
    }
    
    startHorseMove(){
        if(this.moveTrigger == true){
            print("start moving horse");
            this.stopRun = setInterval(() => {
            this.x += (this.moveBuffer[0]/10);
            this.currentImg++;
            },100);
            this.moveTrigger = false;
            
        }
        
        if(this.currentImg>11){
            //update leaderboard 
            updateLeader();
            clearInterval(this.stopRun);
            this.currentImg = 0;
            print(this.moveBuffer);
            this.moveBuffer.shift();
            print(this.moveBuffer);
            if(this.moveBuffer.length > 0){
                print("move horse again");
                this.moveTrigger = true;
            }
        }
        
        
        /*if(this.currentImg==0 && this.moveBuffer.length == 1){
        this.stopRun = setInterval(() => {
            this.x += (this.moveBuffer[0]/10);
            this.currentImg++;
        },100);
        }*/
    }
        
    showHorseName(){
        textSize(11);
        fill(0);
        textAlign(CENTER);
        text(this.name,this.x+72,this.y);
    }

    
}

