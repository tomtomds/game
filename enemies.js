function MakeEnemies(){// 
    var e = {}
    e.offset = 0;
    e.x= Math.random()* (width-35)
    e.y= -20;
    e.width = 35;
    e.height = 35;
    e.bulletTimer = Math.floor((Math.random()*60))+60;
    enemies.push(e)
    log ("made enemies",2);
 }
 

 /**
  * make bullets for enemy
  * @param {number} ex 
  * @param {number} ey 
  */
 function makeEnemiesBullets(ex,ey){
    var eb = {}
    eb.x= ex;    //moveing the bullets to the midel of the enemies.
    eb.y= ey;
    enemyBullets.push(eb) // makes the enemis bullet move.
    log("made enemies",2);
 
 }