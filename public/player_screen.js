var totalHorses;
var horseProfiles = [];
var clientData = {
    roomName: "",
    player: 1,
    score: 0,
    place: 0
    //horseColour: 0,
    //horseName: ""
};

function sendData(){
    socket.emit('getData',clientData);
}

socket.on('sendPlayerNumbertoPlayer',setPlayerNum);

function setPlayerNum(numIn){
    clientData.player = numIn -1;
    //set horse colour
    //clientData.horseColour = numIn - 2;
    //clientData.horseName = horseNames[numIn - 2];
    
    //socket.emt('getNewHorseData',clientData);
}

socket.on('receiveHorseTrack',setPlayerPos);

function setPlayerPos(allPlayerData){
    totalHorses = allPlayerData.length;
    print("sent player data from main: ");
    print(allPlayerData);
    for(var i=0; i<allPlayerData.length; i++){
        if(clientData.player == allPlayerData[i].player){
            clientData.place = i + 1;
        }
    }
    //clientData.place = allPlayerData[clientData.player-1].place;
}
          



/*socket.on('sendPlayerNumber',setPlayerNum);

function setPlayerNum(playerNum){
    clientData.player = playerNum;
}*/


function setupPlayer(){
        //createCanvas(1200,600);
    tokenImg.resize(30,30);
    questions_bg.resize(600,600);

    engine = Engine.create(); 
    world = engine.world;
    
    totalHorses = 0;
    //box1 = Bodies.rectangle(100,100,10,10);
    //box1 = new MakeBox(100,100,10,10);
    Engine.run(engine);
    //World.add(world, box1);
    
    circleSpace = 500/circleRows;
    binSpace =500/binRows;
    
    for(var i=1; i<circleRows; i++){
        //circle(i*circleSpace, 350,10);
        circleBodies.push(Bodies.circle(i*circleSpace + gameCanvasX,300,10,{isStatic: true}));
        //circle((i*circleSpace)-(circleSpace/2), 400,10);
        circleBodies.push(Bodies.circle((i*circleSpace)-(circleSpace/2) + gameCanvasX,350,10,{isStatic: true}));
        //circle(i*circleSpace, 450,10);
        circleBodies.push(Bodies.circle(i*circleSpace + gameCanvasX, 400,10,{isStatic: true}));
        //circle((i*circleSpace)-(circleSpace/2), 500,10);
        circleBodies.push(Bodies.circle((i*circleSpace)-(circleSpace/2) + gameCanvasX, 450,10,{isStatic: true}));
    }
    
    for(var i=1;i<binRows;i++){
        bins.push(Bodies.rectangle(i*binSpace + gameCanvasX,height-50,10,100,{isStatic: true}));
        //line(i*binSpace,height-100,i*binSpace,height);
    }
    World.add(world,bins);
    
    
    /*for(var i=1;i<binRows;i++){
        
    }*/
    
    
    //Left Wall
    wallLeft = Bodies.rectangle(28 + gameCanvasX,height/2,56,height,{isStatic: true});
    World.add(world,wallLeft);
    //Right Wall
    wallRight = Bodies.rectangle(gameCanvasX+472,height/2,56,height,{isStatic: true});
    World.add(world,wallRight);
    
    World.add(world,circleBodies);
    
    //set inital question
    oneStep();
    
    createAnswerInput();
    
    tokenNum = 10;
    tokenRows = 2;
    
    dropTokenBtn = new Button(gameCanvasX,0,backdrop);
    
    
    for(var i=0; i<10; i++){
        horseProfiles[i].resize(250,250);
    }
}

var dropTokenBtn;

// module aliases
var Engine = Matter.Engine,
    Bodies = Matter.Bodies,
    World = Matter.World;

var engine;
var world;

var tokens = [];

var circleBodies = [];

var wallLeft;
var wallRight;

var bins = [];

var binRows = 9;
var binSpace;

var binScore = ["",25,50,10,100,10,50,25,""];
var backdrop;
var tokenImg;

var gameCanvasX = 600;

var tokenNum;

var questions_bg;

var playerPos = 1;




/*function mousePressed(){
    dropToken();
    //print(tokens.length);
}*/

function dropToken(){
    if(mouseX > gameCanvasX && tokenNum > 0){
        tokens.push(new MakeCircle(mouseX,60,30))
        tokenNum--;
        if(tokenNum < 0){
            tokenNum = 0;
        }
    }
}

function drawPlayerScreen() {
    ansInp.show();
    background(100);
    image(questions_bg,0,0);
    
    //image(backdrop,gameCanvasX,0);
    dropTokenBtn.display();
    for(var i=0;i<tokens.length;i++){
        tokens[i].show();
    }
    //box1.show();
    
    //draw horse profile
    image(horseProfiles[clientData.player-1],20,10);
    //image(horseProfiles[2],20,10);
    textAlign(CENTER);
    textSize(24);
    text(horseNames[clientData.player-1],127,245);
    //display current player position
    textSize(46);
    text("Position: " + clientData.place + "/" + totalHorses,420,160);
  
    drawCircles();
    drawBins();
    deleteCircles();
    showText();
    
    showQuestion();
    drawTokens();
    
    //check player pressed drop 
    if(dropTokenBtn.buttonPressed()){
        dropToken();
    }
}

var circleRows = 6;
var circleSpace;
var tokenRows;

function drawTokens(){
        for(var i=0;i<tokenNum;i++){
            if(i<4){
               image(tokenImg,425  + (40*i),280);
            }else if(i>3 && i<8){
               image(tokenImg,425  + (40*(i-4)) ,325); 
            }else if(i>7 && i<12){
               image(tokenImg,425  + (40*(i-8)) ,370); 
            }
        }
   
    
    /*for(var i=0;i<4;i++){
        for(var r=0;r<3;r++){
            image(tokenImg,425  + (40*i),280 + (40*r)); 
        }
    }*/
    
}

function drawCircles(){
    for(var i=1; i<circleRows; i++){
        circle(i*circleSpace + gameCanvasX, 300,10);
        circle(i*circleSpace + gameCanvasX, 400,10);
    }
    
    for(var i=2; i<circleRows; i++){
        circle((i*circleSpace)-(circleSpace/2) + gameCanvasX, 350,10);
        circle((i*circleSpace)-(circleSpace/2) + gameCanvasX, 450,10);
    }
}

function deleteCircles(){
    for(var i=0;i<tokens.length;i++){
        if(tokens[i].body.position.y > height){
            caculateScore(tokens[i].body.position.x);
            tokens.splice(i,1);
            
            sendData();
            //print("remove element please");
        }
    }
}

function MakeBox(x,y,w,h){
    this.body = Bodies.rectangle(x,y,w,h);
    World.add(world, this.body);
    
    this.show = function(){
        var pos = this. body.position;
        var angle = this.body.angle;
        
        push();
        translate(pos.x,pos.y);
        rotate(angle);
        rect(0,0,w,h);
        pop();
    }
}

function MakeCircle(x,y,r){
    this.body = Bodies.circle(x,y,r/2);
    World.add(world, this.body);
    this.body.restitution = 1;
    
    this.show = function(){
        var pos = this. body.position;
        var angle = this.body.angle;
        
        push();
        translate(pos.x,pos.y);
        circle(0,0,r);
        rotate(angle);
        imageMode(CENTER);
        image(tokenImg,0,0);
        pop();
    }
}

function drawBins(){
    for(var i=1;i<binRows;i++){
        line(i*binSpace + gameCanvasX,height-100,i*binSpace + gameCanvasX,height);
    }
}


function showText(){ 
    fill(0);
    //textAlign(CENTER);
    for(var i=0;i<binRows;i++){
        push();
        //rotate(-PI/2);
        textSize(23);
        translate(i*binSpace + (binSpace/2) + 12 + gameCanvasX,550);
        rotate(-PI/2);
        text(binScore[i],0,0);
        pop();
    }
    //text(binScore[0],0,0);  
}

function caculateScore(x){
    this.x = x;
    this.bin; 
    this.divder;
    
    for(var i=1;i<binRows+1;i++){
        if((i*binSpace + gameCanvasX)/this.x > 1){
            this.bin = i - 1;
            break;
        }
    }
    
    //print("token bin number: " + this.bin);
    print("Score: " + binScore[this.bin]);
    clientData.score = binScore[this.bin];
}
