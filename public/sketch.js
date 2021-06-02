var page;

const socket = io.connect('http://localhost:3000');

function preload(){
    //Splash screen setup 
    splashBG = loadImage("images/splash_screen_BG.png");
    
    
    //Horse Race Setup
    for(var i=0; i<13; i++){
        horse1Img[i] = loadImage(`images/Horse 1-${i}.png`);
    }
    for(var i=0; i<13; i++){
        horse2Img[i] = loadImage(`images/Horse 2-${i}.png`);
    }
    for(var i=0; i<13; i++){
        horse3Img[i] = loadImage(`images/Horse 3-${i}.png`);
    }
    for(var i=0; i<13; i++){
        horse4Img[i] = loadImage(`images/Horse 4-${i}.png`);
    }
    for(var i=0; i<13; i++){
        horse5Img[i] = loadImage(`images/Horse 5-${i}.png`);
    }
    for(var i=0; i<13; i++){
        horse6Img[i] = loadImage(`images/Horse 6-${i}.png`);
    }
    for(var i=0; i<13; i++){
        horse7Img[i] = loadImage(`images/Horse 7-${i}.png`);
    }
    for(var i=0; i<13; i++){
        horse8Img[i] = loadImage(`images/Horse 8-${i}.png`);
    }
    for(var i=0; i<13; i++){
        horse9Img[i] = loadImage(`images/Horse 9-${i}.png`);
    }
    for(var i=0; i<13; i++){
        horse10Img[i] = loadImage(`images/Horse 10-${i}.png`);
    }
    
    backdropRace = loadImage("images/brackdrop_edit2.png");
    
    //PLayer Setup
    backdrop = loadImage("images/brackdrop.png");
    tokenImg = loadImage("images/token.png");
    questions_bg = loadImage("images/Questions_backdrop.png");
    for(var i=0; i<10; i++){
        horseProfiles[i] = loadImage(`images/Horse_Character${i+1}.png`); 
        
    }
    
    
    
    newGameImg = loadImage("images/New_Game_Btn.png");
    
    joinGameImg = loadImage("images/Join_Game_Btn.png");
    
    bottomBarrier = loadImage("images/brackdrop_bottom_barrier.png");
    
    startGameImg = loadImage("images/start_game_button.png");
}

function setup() {
  createCanvas(1200,600);
    
    page = 0;
    
    setupSplash();
    
    setupMainScreen();
    //startGameBtn = new Button(550,300,startGameImg);
    
    setupPlayer();
    
    clciked = false;
}

function draw() {
  // put drawing code here
    if(page==0){
        showSplashScreen();
    }else if(page==1){
        drawMainScreen();
        //newGameBtn.hide();
        //joinGameBtn.hide();
    }else if(page==2){
        drawPlayerScreen();
        //newGameBtn.hide();
        //joinGameBtn.hide();
    }else if(page = 3){
        drawPreGameScreen();
    };

    
    clicked = false;
}

class Button {
  
  constructor(inX, inY, inImg) {
    this.x = inX;
    this.y = inY;
    this.img = inImg;
  }
  
  display() {
    stroke(0);
    
    // tint the image on mouse hover
    
    image(this.img, this.x, this.y);
  }
    
    
  buttonPressed(){
      if (this.over()) {
        return true;
    }else{
        return false;
    }
  }
  
  // over automatically matches the width & height of the image read from the file
  // see this.img.width and this.img.height below
  over() {
    if (clicked && mouseX > this.x && mouseX < this.x + this.img.width && mouseY > this.y && mouseY < this.y + this.img.height) {
      return true;
    } else {
      return false;
    }
  }
}

var clicked;

function mouseClicked(){
    clicked = true;
}