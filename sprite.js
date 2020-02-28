console.log("working")

var debugLevel = 1;   //0 = essential    1 = important     2 = not that important

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var width = 400

var running = true;
var backgroundY = 0;
var statePause = 0;


//state management     menu, help, game , end
var state = "menu";

//charter
var charter = new Image();            // get the crater and places it in the middle of the bottom of the screen
charter.src = "./images/playerShip1_green.png"
var x= 180
var y =350

var ship = {}
ship.width = 35;
ship.height = 35;


//bullet
var bullets =  []; // list of bullets in game
var maxBullets =5;

var bulletTimer = 0; // set the time of the bullets to 0 
var canFire = true;


//enemies
var enemies = []; // list of enemies
var enemiesImage = new Image();
enemiesImage.src = "./images/ufoRed.png"; // getting ufo pictur
var enemiestime = 0; // set the time of the enemis to 0
var enemyDelay = 150;

//enemy bullets
var enemyBullets = []; // list of bullets that the enemy has created.
var eBulletImage = new Image();
eBulletImage.src = "./images/laserRed01.png"; //gets the red lazer picture.
//var eBulletTime = 60; // set the time of the ememis ship countdown to fire.



/**
 * The reset function will reset the game varibles
 */
function reset(){
    bullets = []; //clear bullets
    enemies = [];
    enemyBullets = [];
    backgroundY = 0;   
    score =0;
    x=180;
    y=350;
    

}


/**
 * This helper function will log messages to the console based on the level of importance
 * @param {String} message - the message to be logged
 * @param {number} level - the importance, 0 is most important (0-4)
 */
function log(message, level){

    if(level<debugLevel){
        console.log(message);
    }
}


function allowFire(){
    canFire = true;
}


/**
 * this will creat the bullets for the player ship
 * @param {this will get the player x postion.} x 
 * @param {this will get the y postion.} y 
 */
function makebullet(x,y){ // getting the x,y cordations of ship 
    if(bullets.length>maxBullets){return}
   var b = {}
   b.x=x +16;// moveing the bullet to the middel of the player
   b.y=y
   bullets.push(b) // making the bullet move
   canFire = false;
    
 log("made bullet",2);
}



window.onload = function(){ // will run the main function
    this.MakeEnemies()
    this.MakeEnemies()
    main();
}

var keysDown ={}
addEventListener("keydown", function (e){
   keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e){
   delete keysDown[e.keyCode];
}, false);

var score = 0
var highscore = 0

function main (){ // will run the update and draw functiomn in a loop 
if (statePause>0){statePause-=1;}

if (state == "game" ){
     update();
     draw();
}

if(state == "end"){
     checkRestartKey();
      drawGameOver();
}


if(state == "menu"){
    updateMenu();
    drawMenu();
}

if(state == "help"){
    updateHelp();
    drawHelp();
}
   

    requestAnimationFrame(main);
}



function updateMenu(){
    if( statePause>0){return}
        
    if (13 in keysDown){ 
        reset();
        state = "game"
        };
    
    if (32 in keysDown){ //space
        state = "help"
    };
}

function drawMenu(){
    ctx.drawImage(pic,0,0,400,400); // draws the black background 

    ctx.font = "16px Arial";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText ("Main Menu  (Enter)", 175, 180);
    ctx.fillText ("help (Space)", 175,200  )
 
}

function updateHelp(){
    if (13 in keysDown){ 
        statePause= 20;
        state = "menu"
    };
}

function drawHelp(){
    ctx.drawImage(pic,0,0,1000,1000); // draws the black background 

    var x = 20;

    ctx.font = "16px Arial";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText ("help menu", 180, 40);
    ctx.fillText ("controles", 120, 60);
    ctx.fillText ("left arrow is to move the charter left", x, 80);
    ctx.fillText ("up arrow is to move the charter up", x, 100);
    ctx.fillText ("right arrow is to move the charter right", x, 120);
    ctx.fillText ("down arrow is to move the charter down", x, 140);
    ctx.fillText ("enter is for starting the game", x, 160);
}

function drawGameOver(){
    ctx.drawImage(pic,0,0,400,400); // draws the black background 

    ctx.fillText ("Game Over", 175, 180);
    ctx.fillText ("score: "+score, 175, 200);
    ctx.fillText ("highscore:"+highscore, 175, 220)
    ctx.fillText ("restar (enter) ", 175, 240);
}


function draw(){
 //background
 ctx.drawImage(pic,0,backgroundY,400,400); // draws the black background 
 ctx.drawImage(pic,0,backgroundY-400,400,400);

 //game objects
 ctx.drawImage(charter,x,y,35,35); // draws the charter ship

 //daraw bullets
 for(var i=0;i<bullets.length;i++){  // draws the bullets for you ship
    ctx.drawImage(bulletImage,bullets[i].x,bullets[i].y,5,5);
 }
 //draw enemies

 for(var i=0;i<enemies.length;i++){
     enemies[i].offset = Math.sin(enemies[i].y/100) * 15
   
   /// console.log(offset)
    ctx.drawImage(enemiesImage,enemies[i].x + enemies[i].offset,enemies[i].y,enemies[i].width,enemies[i].height);
 }

 //draws enemies bullets
for(var eb=0;eb<enemyBullets.length;eb++){
    ctx.drawImage(eBulletImage,enemyBullets[eb].x,enemyBullets[eb].y,5,5);
}


 //drawing the score 
 ctx.font = "16px Arial";
 ctx.fillStyle = "#FFFFFF";
 ctx.fillText ("score: "+score, 8, 20);
}

/**
 * this will detect the collision of the enemies and the players bullets.
 * @param {this will get the list of player bullets on screen} bullet 
 * @param {this will get the list of enemies on screen} enemies 
 */
function collision(bullet, enemies){ // collision for enemies and bullets
    var x = enemies.x + enemies.offset
   
    if(bullet.x> x && bullet.x<(x + enemies.width) && bullet.y>enemies.y && bullet.y<enemies.y+enemies.height)
        return true;
    else{
        return false;
    
    }

}


function shipCollision(bullet){ // collision for enemies and bullets
   
    if(bullet.x>x && bullet.x<(x+ ship.width) && bullet.y>y && bullet.y<y+ship.height)
        return true;
    else{
        return false;
    
    }

}


function update(){

    backgroundY+=1 // moveing background image
    if(backgroundY>400){ backgroundY = 0}
   

    checkKeys();

    updateBullets();

    updateEnemies();

    updateEnemiesBullets();
}


function checkKeys(){
    
    if (37 in keysDown){ //  when left arrow is pressd moves left  
        x=x-2
    };

    if (39 in keysDown){ //  when right arrow is pressd moves right
        x=x+2
    };

    if (38 in keysDown){ // when Up arrow is pressd moves up
        y=y-2
    };

    if (40 in keysDown){ // when Down arrow is pressd moved down 
        y=y+2
    }

    if (32 in keysDown & bulletTimer<0){ // when space is pressd create bullets 
        makebullet(x,y);
        bulletTimer=10;
    }


}

function checkRestartKey(){
    
    if (13 in keysDown){ 
        reset();
        state = "game"
        };
    
    if (32 in keysDown){
        statePause = 50;
        state = "menu"
    };  
}

function updateEnemies(){

 //update enemis
 enemiestime-=1;


if( enemiestime<0){
    MakeEnemies();
    MakeEnemies();
    enemiestime = enemyDelay;
}

 for(var e=0;e<enemies.length;e++){
    enemies[e].y +=2;

    

    //check if enemy can fire

    if(enemies[e].bulletTimer>0){enemies[e].bulletTimer-=1}

    if(enemies[e].bulletTimer==0){
        enemies[e].bulletTimer = 120;
        makeEnemiesBullets(enemies[e].x,enemies[e].y)

    }

    if (enemies[e].y >400){
     enemies.shift();
     log ("deletad enemies",2)
     return;
    }
 }
}

function updateEnemiesBullets(){

// updates the time of the bullets    
//enemyBullet-=1;

for(var eb=0;eb<enemyBullets.length;eb++){
    enemyBullets[eb].y += 3;

   if (enemyBullets[eb].y >400){
       enemyBullets.splice(eb,1);;   //m4  used shift.......changed to splice
       log(enemyBullets.length, 4)
      return;
      
  }
    
    //if enemies bullets hits the player
  if(shipCollision(enemyBullets[eb])==true){
    enemyBullets.splice(eb,1);; 
   
    if(score>highscore){highscore = score};
    //running = false;
    state = "end"


    log("you are dead" ,0)
  }
     
   
 }
}

/**
 * will update the player bullets. it will do the push, time, get read of the bullets and enemies that are hit and add score
 */
function updateBullets(){
    
    //update bullets
    bulletTimer-=1;


    for(var i=0;i<bullets.length;i++){
       bullets[i].y -= 2;

        //if bullet goes off the top of the screen
       if (bullets[i].y == 0){
        bullets.shift();   
        return;
       } 
     
       //if bullet hits enemy ship
       
        for(var e=0;e<enemies.length;e++){

    
             if(collision(bullets[i],enemies[e])){ //collision from bullets and enemis and then removeing them.
                bullets.splice(i,1);
                enemies.splice(e,1);    
                score++;
                 return; 

             }
        }
    }
}