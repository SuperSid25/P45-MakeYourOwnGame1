var PLAY = 1 ;
var END = 0 ;
var gameState = PLAY ;
var hero ;
var heroAnimation ;
var ground ;
var score ;
var zombie ;
var zombieImg ;
var zombiesGroup ;
var bullet;
var background1;
var laser;



function preload() {
  heroAnimation = loadImage("iron man.png");
  zombieImg = loadImage("zombie.png") ;
  background1 = loadImage("backgroundnew.jpg");
  laser = loadImage("laser-removebg-preview.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  
  hero = createSprite(100,350,20,20) ;
  hero.addImage(heroAnimation);
  hero.scale = 0.8 ;

  
  
  ground = createSprite(400,390,800,20);
  ground.depth = -10 ;
  
  zombiesGroup = new Group();
  bulletsGroup = new Group();

  score = 0 ;
}

function draw() {
  background(background1) ;
  
  stroke("pink")
  fill("pink");
  textSize(60)
  text("Kill The Zombies", 650,70);
  textSize(35);
  text("Press Space to shoot", 700,110)
  

  
  
  
 if(gameState === PLAY){
   
   if(keyDown("space")) {
    
    spawnBullets();
   }
  
   
 if(zombiesGroup.isTouching(bulletsGroup)){
    zombiesGroup.destroyEach();
    bulletsGroup.destroyEach();
  }
   
   spawnZombie() ;
  
   if(zombiesGroup.isTouching(hero)) {
     gameState = END ;
   }
   
 }
   else if (gameState === END) {
     ground.velocityX = 0 ;
     hero.velocityY = 0 ;
     
  
     textSize(80)
     text("GAME OVER" , 650,300 ) ;
     textSize(40);
     text("Press R To Restart" , 660,350)
     hero.disappear;
     
     
     zombiesGroup.setLifetimeEach(-1);
     zombiesGroup.setVelocityXEach(0);
     
    
    
 }
  
  if(keyDown("r")) {
   restart() ;
  }

  hero.collide(ground) ;
  
drawSprites() ; 
}

function spawnZombie() {
  if (frameCount % 100 === 0){
   var zombie = createSprite(650,310,20,150);
    var rand = Math.round(random(80,120));
    zombie.addImage(zombieImg) ;
    zombie.velocityX = -6 ;   
    zombie.scale = 0.4 ;
    zombie.lifetime = 100 ;
    zombie.depth = 10 ;
    zombie.setCollider("circle" , 0,0,150 ) ;
  
    
    
    zombiesGroup.add(zombie);
  }
  
}

function restart() {
    gameState = PLAY ;
    score = 0 ;
    zombiesGroup.destroyEach() ;
}

function spawnBullets() {
   var bullet = createSprite(110,320,10,10);
   bullet.addImage(laser);
   bullet.scale = 0.2;
    var rand = Math.round(random(80,120));
    bullet.velocityX = 6 ;  
    bullet.lifetime = 100 ;
    bullet.depth = 10 ;
  
    
    
    bulletsGroup.add(bullet);
  
}
