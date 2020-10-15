var sword,swordImage,fruitGroup,enemyGroup,enemy,fruit,enemyImage;

var PLAY=1;
var END=0;
var gameState=1;
var knifeSwooshSound , gameoverSound ;
var score
function preload(){
  swordImage=loadImage("sword.png");
  gameoverImage=loadImage("gameover.png")
  fruit1=loadImage("fruit1.png");
  fruit2=loadImage("fruit2.png");
  fruit3=loadImage("fruit3.png");
  fruit4=loadImage("fruit4.png");
  enemy=loadAnimation("alien1.png","alien2.png");
  //enemyImage=loadImage("alien1.png");
  
  knifeSwooshSound = loadSound("knifeSwooshSound.mp3");
  gameoverSound = loadSound("gameover.mp3");
}



function setup(){
  
  createCanvas(400,400);
  
  sword=createSprite(200,200,20,20);
  sword.addImage(swordImage);
  sword.scale=0.7;

  
  
  enemyGroup = createGroup();
  fruitGroup = createGroup();

 score = 0;


}








function draw(){
  
  background("lightblue");
  
  text("Score: "+ score, 300,50);
  
  
  sword.y=World.mouseY;
  sword.x=World.mouseX;
    
  
  
  
  if(gameState === PLAY){
    //move the ground
    //sword=createSprite(200,200,20,20);
  //sword.addImage(swordImage);
  //sword.scale=0.7;
    
   // sword.y=World.mouseY;
 // sword.x=World.mouseX;

  
    if(fruitGroup.isTouching(sword)){
    fruitGroup.destroyEach();
    
    knifeSwooshSound.play();
    score=score+2;
  }
  
    
   fruits();
   Enemy();
  
    
    if(enemyGroup.isTouching(sword)){
   gameState = END;
   gameoverSound.play();   
    }
}
   else if (gameState === END) {
      
      sword.addImage(gameoverImage);
      monster.destroy();
    fruit.destroy();
   
  
    fruitGroup.setVelocityXEach(0);
    enemyGroup.setVelocityXEach(0);
     
     sword.x=200;
     sword.y=200;
  }
     
     
  
  drawSprites();

  
  
  
}

function fruits(){
  if(World.frameCount%80===0){
  fruit=createSprite(400,200,20,20);
  fruit.scale=0.2;
  r=Math.round(random(1,4));
  if (r == 1){
    fruit.addImage(fruit1);
   } else if (r == 2){
     fruit.addImage(fruit2);
   } else if (r == 3){
     fruit.addImage(fruit3);
   } else if (r == 4){
     fruit.addImage(fruit4);
   }
    
   fruit.y=Math.round(random(50,340));
   
   position = Math.round(random(1,2));
    
   if(position==1)
   {
     fruit.x=400;
     fruit.velocityX=-(7+(score/4));
   }  
   else
   {
     if(position==2){
       fruit.x=0;
       fruit.velocityX=(7+(score/4));
     }
   }  
    
   //fruit.velocityX=-7;
   fruit.setLifetime=100;
    
   fruitGroup.add(fruit);
  }
}

function Enemy(){
  if(World.frameCount%200===0) {
    monster=createSprite(400,200,20,20);
    monster.addAnimation("monster",enemy);
    monster.y=Math.round(random(100,300));
    monster.setLifetime=50;
    monster.velocityX=-(8+(score/10));
    
    enemyGroup.add(monster);
  } 
 }