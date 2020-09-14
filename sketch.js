var PLAY=1;
var END=0;
var gameState=PLAY;
var monkey , monkey_running,ground
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score,gameover;

function preload(){
  
  
  monkey_running =loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  monkey_stop=loadAnimation("sprite_0.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  gameoverImage = loadImage("gameover.png");
 
}



function setup() {
 createCanvas(600,200);  
  
monkey=createSprite(60,190,20,20);
monkey.addAnimation("running",monkey_running);
monkey.scale=0.1;

ground=createSprite(60,195,1700,10);
ground.x = ground.width /2;
 


score=0;

FoodGroup=createGroup();
obstacleGroup=createGroup();
}


function draw() {
 background("seagreen"); 

  if(gameState === PLAY){
      ground.velocityX=-4;
    
    fill("yellow");
    textSize(15);
    text("Score:"+score,30,30);
    
 if(keyDown("space")&& monkey.y>=159.3){ 
   monkey.velocityY=-12; 
    } 
  
   monkey.velocityY = monkey.velocityY + 0.75; 
  }
  
  if(FoodGroup.isTouching(monkey)) {
   gameState = PLAY;
    score=score+1;
    FoodGroup.destroyEach();
  }
  else if(gameState === END) {
    background(255);
    fill("red");
    textSize(25);
    text("YOU LOST!",300,100);
    
    rock.velocityX=0;
    
      ground.visible=false;
    
    fill("red");
    textSize(15);
   text("press R to restart",300,150);
    
  
  }
 if(obstacleGroup.isTouching(monkey)) {
   gameState=END;
 }
  
  
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
 
  console.log(monkey.y);
 monkey.collide(ground);
  
 spawnObstacle(); 
 spawnFood(); 
  
  drawSprites(); 
}

function spawnFood() {
if (frameCount % 80 === 0) {
  var banana = createSprite(390, random(70, 100),60,10);
  banana.addImage(bananaImage);
  banana.scale = 0.08;
  banana.velocityX = -6;
  banana.lifetime = 100;
  FoodGroup.add(banana);
}
}

function spawnObstacle() {
  if (frameCount % 120 === 0) {
    var rock = createSprite(390, 175,60,10);
      
    rock.addImage(obstacleImage);
    rock.scale = 0.1;
    rock.velocityX = -6;
    rock.lifetime = 100;
    obstacleGroup.add(rock);
}
}

/* function gameover() {
  background("black");
   fill("yellow");
   textSize(25);
   text("YOU LOST!",300,100);
   score.visible=false;
   
 }*/