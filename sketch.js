var score =0;
var gun,bluebubble,redbubble, bullet, backBoard;
var gunImg,bubbleImg, bulletImg, blastImg, backBoardImg;
var redBubbleGroup, redBubbleGroup, bulletGroup;

var life =3;
var score=0;
var gameState=1

function preload(){
  gunImg = loadImage("gun1.png")
  blastImg = loadImage("blast.png")
  bulletImg = loadImage("bullet1.png")
  blueBubbleImg = loadImage("waterBubble.png")
  redBubbleImg = loadImage("redbubble.png")
  backBoardImg= loadImage("back.jpg")
}
function setup() {
  createCanvas(800,800);

  backBoard= createSprite(1,400);
  backBoard.addImage(backBoardImg)

  heading = createElement("h1");
  scoreboard = createElement("h1");
  
  gun= createSprite(100, height/2, 50,50);
  gun.addImage(gunImg)
  gun.scale=0.2
  
  bulletGroup = createGroup();   
  blueBubbleGroup = createGroup();   
  redBubbleGroup = createGroup();   
  
  score = 0;
}

function draw() {
  background("#BDA297");

  //display Score and number of lifes
  scoreboard.html("Score: "+score);
  scoreboard.style('color:red');
  scoreboard.position(width-200,20);

  heading.html("life:"+life);
  heading.style('color:red');
  heading.position(width-400,20);

  if(gameState===1){
    gun.y=mouseY  
    
    if(keyDown("space")){
      shootBullet();
    }

    if(blueBubbleGroup.collide(bulletGroup)){
      handleBubbleCollision(blueBubbleGroup);
    }

    if(redBubbleGroup.collide(bulletGroup)){
      handleBubbleCollision(redBubbleGroup);
    }

    if(blueBubbleGroup.collide(backBoard)){
      handleGameOver(blueBubbleGroup);
    }

    if(redBubbleGroup.collide(backBoard)){
      handleGameOver(redBubbleGroup);
    }

     

    if (frameCount % 100===0){
      redBubble();
    }

    if (frameCount % 80===0){
      blueBubble();
    }

    drawSprites();
    
  }
     
}

function shootBullet(){
  var bullet = createSprite(400,400)
  bullet.addImage(bulletImg);
  bullet.scale = 0.2;
  bullet.y = gun.y;
  bullet.x = 200;
  bullet.velocityX = 4;
  bullet.lifetime = 100;
  bulletGroup.add(bullet);
}

function blueBubble(){
  blue = createSprite(800,random(20,780),40,40);
  blue.addImage(blueBubbleImg);
  blue.velocityX = -8;
  blue.lifetime = 400;
  blue.scale = 0.1;
  blueBubbleGroup.add(blue);
}

function redBubble(){
  red = createSprite(800,random(20,780),40,40);  
  red.addImage(redBubbleImg);
  red.velocityX = -8;
  red.lifetime = 400;
  red.scale = 0.1;
  redBubbleGroup.add(red);
}

function handleBubbleCollision(bubbleGroup){
  if(life > 0){
    score=score+1;
  }
  bulletGroup.destroyEach();
  bubbleGroup.destroyEach();
}

function handleGameOver(bubbleGroup){
  life = life - 1;
  if(life=0){
    gameState ===2;
    bubbleGroup.destroyEach();
    swal({
      title: 'Game Over',
      text:"you lost the game",
      text: "Your score is"+score,
      imageUrl:"https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
      imageSize: "100x100",
      confirmButtonText: "Thanks For Playing"


    });
  }
}


