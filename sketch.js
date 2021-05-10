var backgroundImg,girlImg,diamondImg,goldcoinsImg,moneyImg,pearlsImg,gameoverImg,restartImg,obstacle1Img,obstacle2Img;
var score=0




function preload(){
backgroundImg =loadImage("background.png")
diamondImg =loadImage("diamond.png")
girlImg =loadAnimation("girl.png","girl2.png","girl3.png")
goldcoinsImg =loadImage("gold coins.png")
moneyImg =loadImage("money.png")
pearlsImg =loadImage("pearls.PNG")
gameoverImg =loadImage("gameOver.png")
restartImg =loadImage("restart.png")
obstacle1Img =loadImage("obstacle1.png")
obstacle2Img =loadImage("obstacle2.png")
}


function setup(){ 
createCanvas(displayWidth,displayHeight)
backgroundsprite=createSprite(500,500,displayWidth,displayHeight)
backgroundsprite.addImage(backgroundImg)
//backgroundsprite.velocityX=-6

groundsprite=createSprite(600,620,30000,10)
groundsprite.visible=false

girlSprite=createSprite(250,600,20,20)
girlSprite.addAnimation("running",girlImg)
girlSprite.scale=1.5

gameoversprite=createSprite(200,500,10,10)
gameoversprite.addImage(gameoverImg)
gameoversprite.visible=false

treasureGroup =new Group();
obstacleGroup =new Group();



}

function draw(){
background("black")
if(backgroundsprite.x<0){
   backgroundsprite.x=backgroundsprite.width/2
}

if(keyDown("space")){
   girlSprite.velocityY=-3
   girlSprite.velocityX=10
}
console.log(girlSprite.x)
girlSprite.velocityY=girlSprite.velocityY+0.1
girlSprite.collide(groundsprite)

camera.position.x=girlSprite.x
camera.position.y=displayHeight/2
if(score===20||girlSprite.isTouching(obstacleGroup)){
   gameoversprite.visible=true
}

if(girlSprite.isTouching(treasureGroup)){
   score=score+2    
}
spawntreasures();
spawnobstacle();
drawSprites();
fill("black")
textSize(15)
text("SCORE:"+score,girlSprite.x,100)
}

function spawntreasures(){
    
      if(frameCount % 150 === 0) {
        var trasures = createSprite(Math.round(random(girlSprite.x-200,girlSprite.x+200)),Math.round(random(300,600)));
        //obstacle.debug = true;
        trasures.velocityX = -(6 + 3*score/100);
        
        //generate random obstacles
        var rand = Math.round(random(1,4));
        switch(rand) {
          case 1: trasures.addImage(diamondImg);
                  break;
          case 2: trasures.addImage(pearlsImg);
                  break;
          case 3: trasures.addImage(goldcoinsImg);
                  break;
          case 4: trasures.addImage(moneyImg);
                  break;
          
          default: break;
        }
        
        //assign scale and lifetime to the obstacle           
        trasures.scale = 0.5;
        trasures.lifetime = 300;
        //add each obstacle to the group
        treasureGroup.add(trasures);
      }
    }
    
    function spawnobstacle(){
    
        if(frameCount % 65 === 0) {
        var obstacle = createSprite(Math.round(random(girlSprite.x-200,girlSprite.x+200)),610);
        //obstacle.debug = true;
        obstacle.velocityX = -(6 + 3*score/100);
        
        //generate random obstacles
        var rand = Math.round(random(1,2));
        switch(rand) {
          case 1: obstacle.addImage(obstacle1Img);
                  break;
          case 2: obstacle.addImage(obstacle2Img);
                  break;
          
          
          default: break;
        }
        
        //assign scale and lifetime to the obstacle           
        obstacle.scale = 0.5;
        obstacle.lifetime = 300;
        //add each obstacle to the group
        obstacleGroup.add(obstacle);
      }
    }
    
 