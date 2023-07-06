/*
	The Game Project Part 4 - Character Interaction
*/

var gameChar_x;
var gameChar_y;
var floorPos_y;
var helicopter_x;
var helicopter_y;

var canyons;
var collectables;
var flagpole;
var trees_x;
var treePos_y;
var clouds;
var cameraPosX = 0;
var helicopterCamera = 0;
var gameScore = 0;
var bullet;
var shieldOn;
var checkpoints;
var helicopterDist;
var obstaclesTop;
var obstaclesBottom;
var platforms;

//Sound variables
var helicopterCrashSound;
var gameOverSound;
var victorySound
var sirenSound;
var helicopterSound;
var jumpSound;

//interaction variables
var helicopterPlummeting;
var helicopterRight;
var helicopterUp;
var insideHelicopter;
var isLeft;
var isRight;
var isFalling;
var isPlummeting;
var gameOver;
var levelComplete;
var touchedPlatform1;
var touchedPlatform2;

function preload()
{
    //Loading all the sounds
    soundFormats('mp3','wav'); 

    jumpSound = loadSound('jumpsound.mp3');
    jumpSound.setVolume(0.1);
    
    helicopterSound = loadSound('helicoptersound.mp3');
    helicopterSound.setVolume(0.1);
    
    sirenSound = loadSound('siren.mp3');
    sirenSound.setVolume(0.03);
    
    gameOverSound = loadSound('gameover.mp3');
    gameOverSound.setVolume(0.15);
    
    victorySound = loadSound('victorysound.mp3')
    victorySound.setVolume(0.3);
    
    helicopterCrashSound = loadSound('mayday.mp3')
    helicopterCrashSound.setVolume(0.5);
}

function setup()
{
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;
	gameChar_x = -1100;
	gameChar_y = floorPos_y;
    
    helicopter_x = 2000;
    helicopter_y = floorPos_y - 50;
        
    platforms = [{x_pos: -320, y_pos: floorPos_y - 50, width: 85},
                 {x_pos: 1400, y_pos: floorPos_y - 50, width: 100}];
    
    checkpoints = [{x_pos: -30, y_pos: floorPos_y, isReached: false},
                   {x_pos: 750, y_pos: floorPos_y, isReached: false},
                   {x_pos: 1700, y_pos: floorPos_y, isReached: false}];
    
    //initialising bullet array, to be added to later
    bullet = [{}];
    
    //canyon object
	canyons = [{x_pos: -750, width: 145},
               {x_pos: -400, width: 245},
               {x_pos: 215, width: 145},
               {x_pos: 450, width: 40},
               {x_pos: 550, width: 40},
               {x_pos: 650, width: 40},
               {x_pos: 1015, width: 145},
               {x_pos: 1300, width: 300}];
    
    //collectable object
    collectables = 
    [{x_pos:-975, y_pos:floorPos_y + 108, size:0.8, isFound:false, range: 0},
     {x_pos:-850, y_pos:floorPos_y + 48, size:0.8, isFound:false, range: 0},
     {x_pos:-725, y_pos:floorPos_y + 108, size:0.8, isFound:false, range: 0},
     {x_pos:-350, y_pos:floorPos_y + 28, size:0.8, isFound:false, range: 0},  {x_pos:240, y_pos:floorPos_y + 108, size:0.8, isFound:false, range: 0},
     {x_pos:520, y_pos:floorPos_y + 108, size:0.8, isFound:false, range: 0},
     {x_pos:660, y_pos:floorPos_y + 108, size:0.8, isFound:false, range: 0},
     {x_pos:780, y_pos:floorPos_y + 108, size:0.8, isFound:false, range: 0},
     {x_pos:1225, y_pos:floorPos_y + 108, size:0.8, isFound:false, range: 0},
     {x_pos:1350, y_pos:floorPos_y + 48, size:0.8, isFound:false, range: 0},
     {x_pos:1500, y_pos:floorPos_y + 108, size:0.8, isFound:false, range: 0},
     {x_pos:1800, y_pos:floorPos_y + 28, size:0.8, isFound:false, range: 0}];
    
    obstaclesBottom = 
        [{x_pos: 2300, y_pos: 426, width: 50, height: 150},
         {x_pos: 2500, y_pos: 376, width: 50, height: 200},
         {x_pos: 2700, y_pos: 326, width: 50, height: 250},
         {x_pos: 2900, y_pos: 276, width: 50, height: 300},
         {x_pos: 3100, y_pos: 276, width: 50, height: 300},
         {x_pos: 3300, y_pos: 326, width: 50, height: 250},
         {x_pos: 3500, y_pos: 376, width: 50, height: 200},
         {x_pos: 3700, y_pos: 426, width: 50, height: 150},
         {x_pos: 3900, y_pos: 426, width: 400, height: 150},
         {x_pos: 4300, y_pos: 426, width: 400, height: 150},
         {x_pos: 4700, y_pos: 426, width: 400, height: 150}];
    
    obstaclesTop = 
        [{x_pos: 2300, y_pos: 0, width: 50, height: 225},
         {x_pos: 2500, y_pos: 0, width: 50, height: 175},
         {x_pos: 2700, y_pos: 0, width: 50, height: 125},
         {x_pos: 2900, y_pos: 0, width: 50, height: 75},
         {x_pos: 3100, y_pos: 0, width: 50, height: 75},
         {x_pos: 3300, y_pos: 0, width: 50, height: 125},
         {x_pos: 3500, y_pos: 0, width: 50, height: 175},
         {x_pos: 3700, y_pos: 0, width: 50, height: 225},
         {x_pos: 3900, y_pos: 0, width: 400, height: 225},
         {x_pos: 4300, y_pos: 0, width: 400, height: 225},
         {x_pos: 4700, y_pos: 0, width: 400, height: 225}];
    
    //flagpole object
    flagpole = {x_pos: 7000, isReached: false};
    
    // all x positions for the tree
    trees_x = [-4100,-3800,-3500,-3200,-2900,-2600,-2300,-2000,-1700,-1400,
               -1100,-900,-550,0,370,700,1170,1650];
    
    //adjust y pos of the trees
    treePos_y = floorPos_y - 144;
    
    //cloud objects
    clouds = 
        [{x_pos: 1200, y_pos: 100, size: 0.3, colour: color(255,255,0)}];
    
    //buildings in background (buildings)
    building = [{x_pos: 120, y_pos: 288, size: 1.5, colour: color(255)},
                {x_pos: -100, y_pos: 393, size: 1.1, colour: color(100)},
                {x_pos: 670, y_pos: 540, size: 0.8, colour: color(220)},
                {x_pos: 750, y_pos: 432, size: 1, colour: color(170)},
                {x_pos: 1430, y_pos: 617, size: 0.7, colour: color(255)},
                {x_pos: 860, y_pos: 309, size: 1.4, colour: color(100)},
                {x_pos: 1555, y_pos: 432, size: 1, colour: color(170)},
                {x_pos: -425, y_pos: 240, size: 1.8, colour: color(220)},
                {x_pos: -410, y_pos: 540, size: 0.8, colour: color(170)},
                {x_pos: -675, y_pos: 240, size: 1.8, colour: color(255)},
                {x_pos: -925, y_pos: 240, size: 1.8, colour: color(100)},
                {x_pos: -1175, y_pos: 240, size: 1.8, colour: color(170)},
                {x_pos: -1425, y_pos: 240, size: 1.8, colour: color(220)}];
    
    //sets all interactions to false at start
    isLeft = false;
    isRight = false;
    isFalling = false;
    isPlummeting = false;   
    gameOver = false;
    levelComplete = false;
    shieldOn = false;
    helicopterPlummeting = false;
    helicopterRight = false;
    helicopterUp = false;
    insideHelicopter = false;
    touchedPlatform1 = false;
    touchedPlatform2 = false;
    
    addHelicopters();
    
    //plays sound at beginning
    sirenSound.rate(0.7);
    sirenSound.play();
    sirenSound.loop();
}
function draw()
{
    // camera is centred on character
    cameraPosX = gameChar_x - width/2;
    // camera is centred on helicopter
    helicopterCamera = helicopter_x - width/4; 

	///////////DRAWING CODE//////////
	background(0,20,100); //fill the sky blue
    
    //draws all rectangles on the ground
    drawGround();
    
    //beginning of scroll
    push();
    translate(-cameraPosX, 0);
    
    if(!insideHelicopter)
    {
        plummetingInteraction();
        drawCanyons();
        drawBuildings();
        drawBackHelicopters();
        drawTrees();
        drawFlagpole();
        drawCheckpoints();
        drawCollectables();
        shield();
        drawCharacter();
        bulletSpawn();      
        drawHelicopter();
    }
    
    if(insideHelicopter)
    {
        pop();
        push();
        translate(-helicopterCamera, 0);
        drawBackHelicopters();
        drawFlagpole();
        drawCheckpoints();
        helicopterCrash();
        drawHelicopter();
    }
    
    obstaclesInteraction();
    createPlatforms();

    pop(); //end of translation
    
    //---------------------------------------------------------
    
    gravity();
    gameTipsText();
    gameStateText();
}

function keyPressed()
{
	// if statements to control the animation of the character when
	// keys are pressed.
    
    //accounts for if user uses caps lock, WASD, arrow keys & space

    //calculates the distance between the helicopter and the character
    helicopterDist = dist(gameChar_x,gameChar_y,helicopter_x,helicopter_y);
    
    if(helicopterDist < 250 && !insideHelicopter && !isPlummeting)
    {
        if(key == "e" || key == "E")
        {
            insideHelicopter = true;
        }     
    }

    //when not in the helicopter, game character can move
    if(!insideHelicopter)
    {
        if(!isFalling && !isPlummeting)
        {
            if(key == "g" || key == "G")
            {
                shieldOn = true;
            }
        }

        if (key == "a" || key == "A" || key == "ArrowLeft")
        {
            isLeft = true;  
        }

        //moves character right
        else if (key == "d" || key == "D" || key == "ArrowRight")
        {
            isRight = true;
        }

        if (isPlummeting)
        {
            //no movement
        }
        //makes character jump
        else if (key == "w" || key == "W" || key == " " || key == "ArrowUp")
        {
            if (isFalling || gameChar_x == -1100 || shieldOn)
            {
                // do nothing, prevents double jump
            }
            else
            {
                //makes game character go up by 100 pixels
                jumpSound.play();
                gameChar_y -= 100;
            }
        }      
    }

    //when in the helicopter, helicopter can now move
    else
    {
        if(helicopterPlummeting)
        {
           // 
        }
        else
        {
             if (key == "d" || key == "D" || key == "ArrowRight")
            {
                helicopterRight = true;
            }

            if (key == "w" || key == "W" || key == " " || key == "ArrowUp")
            {
                helicopterUp = true;
            }
        }
    }
    
    gameEndInteractions();
}
function keyReleased()
{
	// if statements to control the animation of the character when
	// keys are released.
    // stops moving left
    
    if(!insideHelicopter)
    {
        if (key == "a" || key == "A" || key == "ArrowLeft")
        {
            isLeft = false;
        }

        //stops moving right
        else if (key == "d" || key == "D" || key == "ArrowRight")
        {
            isRight = false;
        }

        if (key == "g" || key == "G")
        {
            shieldOn = false;
        }    
    }
    else
    {
        if (key == "d" || key == "D" || key == "ArrowRight")
        {
            helicopterRight = false;

        }

        if(key == "w" || key == "W" || key == " " || key == "ArrowUp")
        {
            helicopterUp = false;
        }       
    }
    
    gameSound();   
}

//This function adds bullets to the bullet array
function bulletSpawn()
{
    if(!gameOver)
    {
        for(var i = 0; i < 200; i++)
        {
            bullet.push({x_pos: -300 - i * 600})
            drawBullet(bullet[i]);
        }
    }
}

//This function handles the drawing code & movement of the bullet
//also handles the collision detections
function drawBullet(newbullet)
{
    fill(215,185,75);
    stroke(0);
    beginShape();
    vertex(newbullet.x_pos - 15, floorPos_y - 28);
    vertex(newbullet.x_pos - 5, floorPos_y - 28);
    vertex(newbullet.x_pos - 5, floorPos_y - 12);
    vertex(newbullet.x_pos - 5, floorPos_y - 28);
    vertex(newbullet.x_pos + 25, floorPos_y - 28);
    vertex(newbullet.x_pos + 32, floorPos_y - 25);
    vertex(newbullet.x_pos + 32, floorPos_y - 15);
    vertex(newbullet.x_pos + 25, floorPos_y - 12);
    vertex(newbullet.x_pos + 25, floorPos_y - 28);
    vertex(newbullet.x_pos + 25, floorPos_y - 12);
    vertex(newbullet.x_pos - 15, floorPos_y - 12);
    vertex(newbullet.x_pos - 15, floorPos_y - 28);
    endShape();
    
    fill(192,192,192);
    beginShape();
    vertex(newbullet.x_pos + 32, floorPos_y - 25);
    vertex(newbullet.x_pos + 46, floorPos_y - 23);
    vertex(newbullet.x_pos + 52, floorPos_y - 21);
    vertex(newbullet.x_pos + 52, floorPos_y - 19);
    vertex(newbullet.x_pos + 46, floorPos_y - 17);
    vertex(newbullet.x_pos + 32, floorPos_y - 15);
    endShape();
    
    //speed of bullet is 9/2
    newbullet.x_pos += 9/2;
    
    //detects if game character has collided
    if((gameChar_x < newbullet.x_pos + 40 && gameChar_x > newbullet.x_pos) && gameChar_y > floorPos_y - 20)
    {
        isPlummeting = true;   
    }
}
function drawBuildings()
{
    //draws the 'buildings'(buildings in bg)
    for(var i = 0; i < building.length; i++)
    {
        //building -----------------------------
        fill(200);
        //dome above
        ellipse(building[i].x_pos * building[i].size + 100 * building[i].size,
                building[i].y_pos * building[i].size - 172 * building[i].size,
                50 * building[i].size);
        
        //shadow in back of bank
        rect(building[i].x_pos * building[i].size - 20 * building[i].size,
             building[i].y_pos * building[i].size - 136 * building[i].size,
             240 * building[i].size,
             136 * building[i].size);

        noStroke();
        fill(building[i].colour);
        //stairs of bank
        triangle(building[i].x_pos * building[i].size,
                 building[i].y_pos * building[i].size - 20 * building[i].size,
                 building[i].x_pos * building[i].size,
                 building[i].y_pos * building[i].size,
                 building[i].x_pos * building[i].size - 20 * building[i].size,
                 building[i].y_pos * building[i].size);

        //stair on right side
        triangle(building[i].x_pos * building[i].size + 200 * building[i].size,
                 building[i].y_pos * building[i].size - 20 * building[i].size,
                 building[i].x_pos * building[i].size + 200 * building[i].size,
                 building[i].y_pos * building[i].size,
                 building[i].x_pos * building[i].size + 220 * building[i].size,
                 building[i].y_pos * building[i].size);

        //floor of bank
        rect(building[i].x_pos * building[i].size,
             building[i].y_pos * building[i].size - 20 * building[i].size,
             200 * building[i].size,
             20 * building[i].size);

        //PILLARS
        rect(building[i].x_pos * building[i].size + 20 * building[i].size,
             building[i].y_pos * building[i].size - 20 * building[i].size,
             20 * building[i].size,
             -100 * building[i].size);

        rect(building[i].x_pos * building[i].size + 60 * building[i].size,
             building[i].y_pos * building[i].size - 20 * building[i].size,
             20 * building[i].size,
             -100 * building[i].size);

        rect(building[i].x_pos * building[i].size + 120 * building[i].size,
             building[i].y_pos * building[i].size - 20 * building[i].size,
             20 * building[i].size,
             -100 * building[i].size);

        rect(building[i].x_pos * building[i].size + 160 * building[i].size,
             building[i].y_pos * building[i].size - 20 * building[i].size,
             20 * building[i].size,
             -100 * building[i].size);

        rect(building[i].x_pos * building[i].size - 30 * building[i].size,
             building[i].y_pos * building[i].size - 130 * building[i].size,
             10 * building[i].size,
             130 * building[i].size);

        rect(building[i].x_pos * building[i].size + 220 * building[i].size,
             building[i].y_pos * building[i].size - 130 * building[i].size,
             10 * building[i].size,
             130 * building[i].size);
        //roof of bank
        quad(building[i].x_pos * building[i].size + 40 * building[i].size,  //x1
             building[i].y_pos * building[i].size - 182 * building[i].size, //y1
             building[i].x_pos * building[i].size + 160 * building[i].size, //x2
             building[i].y_pos * building[i].size - 182 * building[i].size, //y2
             building[i].x_pos * building[i].size + 180 * building[i].size, //x3
             building[i].y_pos * building[i].size - 150 * building[i].size, //y3
             building[i].x_pos * building[i].size + 20 * building[i].size,  //x4
             building[i].y_pos * building[i].size - 150 * building[i].size);//y4
        //2nd roof level
        quad(building[i].x_pos * building[i].size,
             building[i].y_pos * building[i].size - 162 * building[i].size,
             building[i].x_pos * building[i].size + 200 * building[i].size,
             building[i].y_pos * building[i].size - 162 * building[i].size,
             building[i].x_pos * building[i].size + 230 * building[i].size,
             building[i].y_pos * building[i].size - 130 * building[i].size,
             building[i].x_pos * building[i].size - 30 * building[i].size,
             building[i].y_pos * building[i].size - 130 * building[i].size);

        //top of pillars, first pillar
        quad(building[i].x_pos * building[i].size + 15 * building[i].size,
             building[i].y_pos * building[i].size - 130 * building[i].size,
             building[i].x_pos * building[i].size + 45 * building[i].size,
             building[i].y_pos * building[i].size - 130 * building[i].size,
             building[i].x_pos * building[i].size + 40 * building[i].size, 
             building[i].y_pos * building[i].size - 120 * building[i].size,
             building[i].x_pos * building[i].size + 20 * building[i].size, 
             building[i].y_pos * building[i].size - 120 * building[i].size);
        //second pillar
        quad(building[i].x_pos * building[i].size + 55 * building[i].size, 
             building[i].y_pos * building[i].size - 130 * building[i].size,
             building[i].x_pos * building[i].size + 85 * building[i].size,
             building[i].y_pos * building[i].size - 130 * building[i].size,
             building[i].x_pos * building[i].size + 80 * building[i].size,
             building[i].y_pos * building[i].size - 120 * building[i].size,
             building[i].x_pos * building[i].size + 60 * building[i].size,
             building[i].y_pos * building[i].size - 120 * building[i].size);
        //third pillar
        quad(building[i].x_pos * building[i].size + 115 * building[i].size, 
             building[i].y_pos * building[i].size - 130 * building[i].size,
             building[i].x_pos * building[i].size + 145 * building[i].size,
             building[i].y_pos * building[i].size - 130 * building[i].size,
             building[i].x_pos * building[i].size + 140 * building[i].size,
             building[i].y_pos * building[i].size - 120 * building[i].size,
             building[i].x_pos * building[i].size + 120 * building[i].size,
             building[i].y_pos * building[i].size - 120 * building[i].size);
        //fourth pillar
        quad(building[i].x_pos * building[i].size + 155 * building[i].size,
             building[i].y_pos * building[i].size - 130 * building[i].size,
             building[i].x_pos * building[i].size + 185 * building[i].size,
             building[i].y_pos * building[i].size - 130 * building[i].size,
             building[i].x_pos * building[i].size + 180 * building[i].size,
             building[i].y_pos * building[i].size - 120 * building[i].size,
             building[i].x_pos * building[i].size + 160 * building[i].size,
             building[i].y_pos * building[i].size - 120 * building[i].size);
        //bank door
        fill(0);
        rect(building[i].x_pos * building[i].size + 90 * building[i].size,
             building[i].y_pos * building[i].size - 20 * building[i].size,
             20 * building[i].size,
             -30 * building[i].size);
    }
}

//This function adds the background helicopters to the array clouds
function addHelicopters()
{
    for(var i = 0; i < 200; i++)
    {
        if(i % 2 == 0)
        {
            clouds.push({x_pos: -600 + i * 500, 
                         y_pos: random(0,200),
                         size: random(0.15, 0.25),
                         colour: color(random(0,255),random(0,255),random(0,255))});
        }
        else
        {
            clouds.push({x_pos: -600 - i * 500, 
                         y_pos: random(0,200),
                         size: random(0.15, 0.55),
                         colour: color(random(0,255),random(0,255),random(0,255))});
        }
    }
}

//This function draws helicopters to the background
function drawBackHelicopters()
{
    for(var i = 0; i < clouds.length; i++)
    {
        //controls speed of helicopters 
        clouds[i].x_pos -= 4;
        
        //landing skids
        stroke(68,85,90);   
        strokeWeight(10 * clouds[i].size);
        line(clouds[i].x_pos * clouds[i].size + 45 * clouds[i].size,
             clouds[i].y_pos * clouds[i].size + 90 * clouds[i].size,
             clouds[i].x_pos * clouds[i].size + 190 * clouds[i].size,
             clouds[i].y_pos * clouds[i].size + 90 * clouds[i].size);

        line(clouds[i].x_pos * clouds[i].size + 95 * clouds[i].size,
             clouds[i].y_pos * clouds[i].size + 75 * clouds[i].size,
             clouds[i].x_pos * clouds[i].size + 95 * clouds[i].size,
             clouds[i].y_pos * clouds[i].size + 90 * clouds[i].size);

        line(clouds[i].x_pos * clouds[i].size + 125 * clouds[i].size,
             clouds[i].y_pos * clouds[i].size + 75 * clouds[i].size,
             clouds[i].x_pos * clouds[i].size + 125 * clouds[i].size,
             clouds[i].y_pos * clouds[i].size + 90 * clouds[i].size);    
        //helicopter body
        noStroke();
        fill(clouds[i].colour);
        rect(clouds[i].x_pos * clouds[i].size + 175 * clouds[i].size,
             clouds[i].y_pos * clouds[i].size + 25 * clouds[i].size,
             35 * clouds[i].size,
             20 * clouds[i].size);

        quad(clouds[i].x_pos * clouds[i].size + 210 * clouds[i].size,
             clouds[i].y_pos * clouds[i].size + 25 * clouds[i].size,
             clouds[i].x_pos * clouds[i].size + 210 * clouds[i].size,
             clouds[i].y_pos * clouds[i].size + 45 * clouds[i].size,
             clouds[i].x_pos * clouds[i].size + 260 * clouds[i].size,
             clouds[i].y_pos * clouds[i].size + 45 * clouds[i].size,
             clouds[i].x_pos * clouds[i].size + 260 * clouds[i].size,
             clouds[i].y_pos * clouds[i].size + 5 * clouds[i].size);

        ellipse(clouds[i].x_pos * clouds[i].size + 110 * clouds[i].size,
                clouds[i].y_pos * clouds[i].size + 40 * clouds[i].size,
                150 * clouds[i].size,
                70 * clouds[i].size);
        //Open part of helicopter
        fill(0,0,0);
        rect(clouds[i].x_pos * clouds[i].size + 90 * clouds[i].size,
             clouds[i].y_pos * clouds[i].size + 20 * clouds[i].size,
             70 * clouds[i].size,
             40 * clouds[i].size);
        //Helicopter rotors
        stroke(119,136,153);
        strokeWeight(10 * clouds[i].size);
        noFill();
        bezier(clouds[i].x_pos * clouds[i].size + 230 * clouds[i].size,
               clouds[i].y_pos * clouds[i].size - 30 * clouds[i].size,
               clouds[i].x_pos * clouds[i].size + 45 * clouds[i].size,
               clouds[i].y_pos * clouds[i].size,
               clouds[i].x_pos * clouds[i].size + 110 * clouds[i].size,
               clouds[i].y_pos * clouds[i].size,
               clouds[i].x_pos * clouds[i].size + 230 * clouds[i].size,
               clouds[i].y_pos * clouds[i].size + 30 * clouds[i].size);
        
        bezier(clouds[i].x_pos * clouds[i].size - 10 * clouds[i].size,
               clouds[i].y_pos * clouds[i].size - 30 * clouds[i].size,
               clouds[i].x_pos * clouds[i].size + 165 * clouds[i].size,
               clouds[i].y_pos * clouds[i].size,
               clouds[i].x_pos * clouds[i].size + 110 * clouds[i].size,
               clouds[i].y_pos * clouds[i].size,
               clouds[i].x_pos * clouds[i].size - 10 * clouds[i].size,
               clouds[i].y_pos * clouds[i].size + 30 * clouds[i].size);
        stroke(0);
        circle(clouds[i].x_pos * clouds[i].size + 110 * clouds[i].size,
               clouds[i].y_pos * clouds[i].size - 2 * clouds[i].size,
               5 * clouds[i].size);
    }
}

//this function handles the drawing of the trees
function drawTrees()
{
    // draws the trees at x positions from array trees_x
    for(var i = 0; i < trees_x.length; i++)
    {
        //alternates between trees every number
        if( i % 2 == 0)
        {
            //Draws the leaves on the tree
            noStroke();
            fill(0,150,0);
            ellipse(trees_x[i] - 35, floorPos_y - 200, 150);
            ellipse(trees_x[i] + 75, floorPos_y - 210, 150);
            fill(0,100,0);
            ellipse(trees_x[i] + 20, floorPos_y - 270, 150);
            
            //Draws the bark & branches of the tree
            fill(114,92,66);
            stroke(0);
            strokeWeight(1);
            
            beginShape();
            vertex(trees_x[i],floorPos_y);
            vertex(trees_x[i] + 5,floorPos_y - 20);
            vertex(trees_x[i] + 5,floorPos_y - 150);
            vertex(trees_x[i] - 50,floorPos_y - 200);
            vertex(trees_x[i] - 50,floorPos_y - 205);
            vertex(trees_x[i] - 45,floorPos_y - 205);
            vertex(trees_x[i] + 10,floorPos_y - 160);
            vertex(trees_x[i] + 20,floorPos_y - 250);
            vertex(trees_x[i] + 25,floorPos_y - 250);
            vertex(trees_x[i] + 35,floorPos_y - 180);
            vertex(trees_x[i] + 85,floorPos_y - 210);
            vertex(trees_x[i] + 85,floorPos_y - 205);
            vertex(trees_x[i] + 35,floorPos_y - 150);
            vertex(trees_x[i] + 35,floorPos_y - 20);
            vertex(trees_x[i] + 40,floorPos_y);
            endShape();
        }
        else
        {
            //Draws the leaves on the tree
            noStroke();
            fill(0,100,0)
            ellipse(trees_x[i] + 35, floorPos_y - 140, 80);
            
            fill(0,120,0)
            ellipse(trees_x[i] + 80, floorPos_y - 135, 80);
            ellipse(trees_x[i] - 10, floorPos_y - 120, 80);
            
            fill(0,160,0)
            ellipse(trees_x[i] + 120, floorPos_y - 110, 80);
            ellipse(trees_x[i] - 35, floorPos_y - 90, 80);
            
            //Draws the bark & branches of the tree
            fill(114,92,66);
            stroke(0);
            strokeWeight(1);
            
            beginShape();
            vertex(trees_x[i],floorPos_y);
            vertex(trees_x[i] + 20,floorPos_y - 10);
            vertex(trees_x[i] + 20,floorPos_y - 50);
            vertex(trees_x[i] - 50,floorPos_y - 75);
            vertex(trees_x[i] - 50,floorPos_y - 85);
            vertex(trees_x[i] + 25,floorPos_y - 65);
            vertex(trees_x[i] + 35,floorPos_y - 130);
            vertex(trees_x[i] + 40,floorPos_y - 130);
            vertex(trees_x[i] + 45,floorPos_y - 60);
            vertex(trees_x[i] + 130,floorPos_y - 110);
            vertex(trees_x[i] + 130,floorPos_y - 105);
            vertex(trees_x[i] + 50,floorPos_y - 50);
            vertex(trees_x[i] + 50,floorPos_y - 10);
            vertex(trees_x[i] + 70,floorPos_y);
            endShape();
        }
    }
}

//this function makes it possible to shield and block bullets
function shield()
{
    stroke(1);
    //cannot move while shielding
    fill(255,255,255,50);
    if(shieldOn && !touchedPlatform1)
    {
        ellipse(gameChar_x, gameChar_y - 30, 50, 80);
        isPlummeting = false;
        isLeft = false;
        isRight = false;
        
        gameChar_y = floorPos_y;
    }
    else if(shieldOn && touchedPlatform1)
    {
        ellipse(gameChar_x, gameChar_y - 30, 50, 80);
        isPlummeting = false;
        isLeft = false;
        isRight = false;
        gameChar_y = platforms[0].y_pos;
    }
    else
    {
        //
    }
}

function drawFlagpole()
{
    //checks if character is in range of flagpole(helipad)
    if(helicopter_x + 40 >= 5700 &&
       helicopter_x + 40 <= 5950 &&
       helicopter_y - 45 >= 440)
    {
        helicopter_x = 5750;
        helicopter_y = 485;
        flagpole.isReached = true;
    }
    else if(helicopter_x + 40 > 5850 &&
            helicopter_y - 45 >= 440)
    {
        //if the helicopter lands and is not in range then
        isPlummeting = true;
    }
    
    if (flagpole.isReached)
    {     
        //helicopter controls are frozen
        helicopterUp = false;
        helicopterRight = false;
        
        //Draws Island
        noStroke();
        fill(210,170,109);
        ellipse(5900, 666, 900, 450);
        stroke(92, 40, 0);
        
        //draws Helipad
        noFill();
        strokeWeight(3);
        ellipse(5770, 533, 150, 75);
        beginShape();
        vertex(5725,545);
        vertex(5810,550);
        vertex(5768,1095/2);
        vertex(5780,514);
        vertex(5827,516.5);
        vertex(5733,511.5);
        vertex(5780,514);
        endShape();
        
        stroke(150);
        fill(230);
        //draws second floor of the building
        beginShape();
        vertex(6030, 366);
        vertex(6030, 286);
        vertex(6160, 286);
        vertex(6160, 416);
        vertex(6030, 426);
        endShape();
        
        //draws first floor of building
        fill(248,246,240);
        beginShape();
        vertex(5950, 516);
        vertex(5950, 416);
        vertex(5930, 416);
        vertex(5930, 406);
        vertex(6000, 406);
        vertex(6000, 366);
        vertex(6120, 366);
        vertex(6120, 406);
        vertex(6190, 406);
        vertex(6190, 416);
        vertex(6170, 416);
        vertex(6170, 516);
        vertex(5950, 516);
        endShape();
        
        strokeWeight(1);
        //Using a for loop to create windows
        for(var i = 0; i < 10; i++)
        {
            for(var j = 0; j < 3; j++)
            {
                if((j == 1 || j == 2) && (i == 1 || i == 2))
                {
                    stroke(0);
                    fill(0);
                    rect(5980,446,40,70);
                }
                else
                {
                    stroke(50);
                    fill(100,200,0);
                    rect(5960 + i * 20, 416 + j * 30, 20, 30);                  
                }
            }
        }
        
        rect(6040, 296, 110, 60);
        noStroke();
        strokeWeight(1);
    }
    else
    {
        //FLAGPOLE --------------------------------
        //Draws Island
        noStroke();
        fill(210,170,109);
        ellipse(5900, 666, 900, 450);
        stroke(92, 40, 0);
        
        //Draws Helipad
        noFill();
        strokeWeight(3);
        ellipse(5770, 533, 150, 75);
        beginShape();
        vertex(5725,545);
        vertex(5810,550);
        vertex(5768,1095/2);
        vertex(5780,514);
        vertex(5827,516.5);
        vertex(5733,511.5);
        vertex(5780,514);
        endShape();
        
        //Draws Second Floor
        stroke(150);
        fill(230);
        beginShape();
        vertex(6030, 366);
        vertex(6030, 286);
        vertex(6160, 286);
        vertex(6160, 416);
        vertex(6030, 426);
        endShape();
        
        //Draws first floor
        fill(248,246,240);
        beginShape();
        vertex(5950, 516);
        vertex(5950, 416);
        vertex(5930, 416);
        vertex(5930, 406);
        vertex(6000, 406);
        vertex(6000, 366);
        vertex(6120, 366);
        vertex(6120, 406);
        vertex(6190, 406);
        vertex(6190, 416);
        vertex(6170, 416);
        vertex(6170, 516);
        vertex(5950, 516);
        endShape();
        
        //Draws windows
        strokeWeight(1);
        for(var i = 0; i < 10; i++)
        {
            for(var j = 0; j < 3; j++)
            {
                if((j == 1 || j == 2) && (i == 1 || i == 2))
                {
                    stroke(0);
                    fill(0);
                    rect(5980,446,40,70);
                }
                else
                {
                    stroke(50);
                    fill(224,255,255);
                    rect(5960 + i * 20, 416 + j * 30, 20, 30);                  
                }
            }
        }
        
        rect(6040, 296, 110, 60)
        noStroke();
        strokeWeight(1);
    }
}

function drawCheckpoints()
{
    //handles flag changing
    for(var i = 0; i < checkpoints.length; i++)
    {
        if (gameChar_x >= checkpoints[i].x_pos)
        {
            checkpoints[i].isReached = true;
        }
        if(checkpoints[i].isReached)
        {
            //Streetlight is turned on when checkpoint is reached
            fill(100,200,0);
            ellipse(checkpoints[i].x_pos + 41,
                    checkpoints[i].y_pos - 192, 20, 13);
            fill(100,200,0,100);
            quad(checkpoints[i].x_pos + 25, checkpoints[i].y_pos, 
                 checkpoints[i].x_pos + 101, checkpoints[i].y_pos,
                 checkpoints[i].x_pos + 45, checkpoints[i].y_pos - 200,
                 checkpoints[i].x_pos + 33, checkpoints[i].y_pos - 200);
            
            //streetlight pole
            fill(0);
            beginShape();
            vertex(checkpoints[i].x_pos, checkpoints[i].y_pos);
            vertex(checkpoints[i].x_pos, checkpoints[i].y_pos - 3);
            vertex(checkpoints[i].x_pos + 2, checkpoints[i].y_pos - 12);
            vertex(checkpoints[i].x_pos + 2, checkpoints[i].y_pos - 106);
            vertex(checkpoints[i].x_pos + 10, checkpoints[i].y_pos - 126);
            vertex(checkpoints[i].x_pos + 10, checkpoints[i].y_pos - 156);
            vertex(checkpoints[i].x_pos + 12, checkpoints[i].y_pos - 178);
            vertex(checkpoints[i].x_pos + 16, checkpoints[i].y_pos - 188);
            vertex(checkpoints[i].x_pos + 22, checkpoints[i].y_pos - 196);
            vertex(checkpoints[i].x_pos + 30, checkpoints[i].y_pos - 202);
            vertex(checkpoints[i].x_pos + 50, checkpoints[i].y_pos - 202);
            vertex(checkpoints[i].x_pos + 56, checkpoints[i].y_pos - 196);
            vertex(checkpoints[i].x_pos + 50, checkpoints[i].y_pos - 190);
            vertex(checkpoints[i].x_pos + 38, checkpoints[i].y_pos - 190);
            vertex(checkpoints[i].x_pos + 26, checkpoints[i].y_pos - 194);
            vertex(checkpoints[i].x_pos + 22, checkpoints[i].y_pos - 188);
            vertex(checkpoints[i].x_pos + 18, checkpoints[i].y_pos - 178);
            vertex(checkpoints[i].x_pos + 16, checkpoints[i].y_pos - 156);
            vertex(checkpoints[i].x_pos + 16, checkpoints[i].y_pos - 126);
            vertex(checkpoints[i].x_pos + 24, checkpoints[i].y_pos - 106);
            vertex(checkpoints[i].x_pos + 24, checkpoints[i].y_pos - 12);
            vertex(checkpoints[i].x_pos + 26, checkpoints[i].y_pos - 3);
            vertex(checkpoints[i].x_pos + 26, checkpoints[i].y_pos);
            vertex(checkpoints[i].x_pos, checkpoints[i].y_pos);
            endShape();
        }
        else
        {   
            //streetlight pole
            fill(150);
            ellipse(checkpoints[i].x_pos + 41, 
                    checkpoints[i].y_pos - 192, 20, 13);
            fill(0);
            beginShape();
            vertex(checkpoints[i].x_pos, checkpoints[i].y_pos);
            vertex(checkpoints[i].x_pos, checkpoints[i].y_pos - 3);
            vertex(checkpoints[i].x_pos + 2, checkpoints[i].y_pos - 12);
            vertex(checkpoints[i].x_pos + 2, checkpoints[i].y_pos - 106);
            vertex(checkpoints[i].x_pos + 10, checkpoints[i].y_pos - 126);
            vertex(checkpoints[i].x_pos + 10, checkpoints[i].y_pos - 156);
            vertex(checkpoints[i].x_pos + 12, checkpoints[i].y_pos - 178);
            vertex(checkpoints[i].x_pos + 16, checkpoints[i].y_pos - 188);
            vertex(checkpoints[i].x_pos + 22, checkpoints[i].y_pos - 196);
            vertex(checkpoints[i].x_pos + 30, checkpoints[i].y_pos - 202);
            vertex(checkpoints[i].x_pos + 50, checkpoints[i].y_pos - 202);
            vertex(checkpoints[i].x_pos + 56, checkpoints[i].y_pos - 196);
            vertex(checkpoints[i].x_pos + 50, checkpoints[i].y_pos - 190);
            vertex(checkpoints[i].x_pos + 38, checkpoints[i].y_pos - 190);
            vertex(checkpoints[i].x_pos + 26, checkpoints[i].y_pos - 194);
            vertex(checkpoints[i].x_pos + 22, checkpoints[i].y_pos - 188);
            vertex(checkpoints[i].x_pos + 18, checkpoints[i].y_pos - 178);
            vertex(checkpoints[i].x_pos + 16, checkpoints[i].y_pos - 156);
            vertex(checkpoints[i].x_pos + 16, checkpoints[i].y_pos - 126);
            vertex(checkpoints[i].x_pos + 24, checkpoints[i].y_pos - 106);
            vertex(checkpoints[i].x_pos + 24, checkpoints[i].y_pos - 12);
            vertex(checkpoints[i].x_pos + 26, checkpoints[i].y_pos - 3);
            vertex(checkpoints[i].x_pos + 26, checkpoints[i].y_pos);
            vertex(checkpoints[i].x_pos, checkpoints[i].y_pos);
            endShape();
        }   
    }
}

function drawCollectables()
{
    //Checks if collectables are in range, then increments gameScore
    for(var i = 0; i < collectables.length; i++)
    {
        collectables[i].range = 
        dist(gameChar_x,gameChar_y,
        collectables[i].x_pos * collectables[i].size,collectables[i].y_pos * collectables[i].size);
        
        if(!collectables[i].isFound)
        {
            if (collectables[i].range < 45 * collectables[i].size)
            {
                collectables[i].isFound = true;
                gameScore = gameScore + 1;
            }            
        }
        
        if(!collectables[i].isFound)
        {
            //Ruby gem created
            strokeWeight(1 * collectables[i].size);
            stroke(0,0,0);
            fill(227,17,95);
            triangle(collectables[i].x_pos * collectables[i].size - 35 * collectables[i].size,
                     collectables[i].y_pos * collectables[i].size - 35 * collectables[i].size,
                     collectables[i].x_pos * collectables[i].size - 10 * collectables[i].size,
                     collectables[i].y_pos * collectables[i].size - 55 * collectables[i].size,
                     collectables[i].x_pos * collectables[i].size - 10 * collectables[i].size,
                     collectables[i].y_pos * collectables[i].size - 35 * collectables[i].size);

            square(collectables[i].x_pos * collectables[i].size - 10 * collectables[i].size,
                   collectables[i].y_pos * collectables[i].size - 35 * collectables[i].size - 20 * collectables[i].size, 
                   20 * collectables[i].size);

            triangle(collectables[i].x_pos * collectables[i].size + 35 * collectables[i].size,
                     collectables[i].y_pos * collectables[i].size - 35 * collectables[i].size,
                     collectables[i].x_pos * collectables[i].size + 10 * collectables[i].size,
                     collectables[i].y_pos * collectables[i].size - 35 * collectables[i].size - 20 * collectables[i].size,
                     collectables[i].x_pos * collectables[i].size + 10 * collectables[i].size,
                     collectables[i].y_pos * collectables[i].size - 35 * collectables[i].size);

            triangle(collectables[i].x_pos * collectables[i].size - 35 * collectables[i].size,
                     collectables[i].y_pos * collectables[i].size - 35 * collectables[i].size,
                     collectables[i].x_pos * collectables[i].size,
                     collectables[i].y_pos * collectables[i].size - 5  * collectables[i].size,
                     collectables[i].x_pos * collectables[i].size + 35 * collectables[i].size,
                     collectables[i].y_pos * collectables[i].size - 35 * collectables[i].size);

            //detail on diamonds
            line(collectables[i].x_pos * collectables[i].size,
                 collectables[i].y_pos * collectables[i].size - 5 * collectables[i].size,
                 collectables[i].x_pos * collectables[i].size - 10 * collectables[i].size,
                 collectables[i].y_pos * collectables[i].size - 35 * collectables[i].size);

            line(collectables[i].x_pos * collectables[i].size,
                 collectables[i].y_pos * collectables[i].size - 5 * collectables[i].size,
                 collectables[i].x_pos * collectables[i].size + 10 * collectables[i].size,
                 collectables[i].y_pos * collectables[i].size - 35 * collectables[i].size);
            strokeWeight(1);
        }
    }
}

function drawCanyons()
{
    //draws the canyons
    for(var i = 0; i < canyons.length; i++)
    {
        noStroke();
        fill(145, 142, 133);
        rect(canyons[i].x_pos, floorPos_y, canyons[i].width, height - floorPos_y);
        fill(100);
        rect(canyons[i].x_pos, floorPos_y + 15, canyons[i].width, height - floorPos_y);
        fill(92, 40, 0);
        ellipse(canyons[i].x_pos + canyons[i].width/2,
                floorPos_y + 15,
                canyons[i].width, 30);
        stroke(200);
        noFill();
        strokeWeight(2);
        bezier(canyons[i].x_pos, floorPos_y + 50,
               canyons[i].x_pos + canyons[i].width/4,floorPos_y + 35,
               canyons[i].x_pos + canyons[i].width * 3/4,floorPos_y + 35,
               canyons[i].x_pos + canyons[i].width, floorPos_y + 50);
        
        bezier(canyons[i].x_pos, floorPos_y + 70,
               canyons[i].x_pos + canyons[i].width/4,floorPos_y + 55,
               canyons[i].x_pos + canyons[i].width * 3/4,floorPos_y + 55,
               canyons[i].x_pos + canyons[i].width, floorPos_y + 70);
        
        bezier(canyons[i].x_pos, floorPos_y + 90,
               canyons[i].x_pos + canyons[i].width/4,floorPos_y + 75,
               canyons[i].x_pos + canyons[i].width * 3/4,floorPos_y + 75,
               canyons[i].x_pos + canyons[i].width, floorPos_y + 90);
        
        bezier(canyons[i].x_pos, floorPos_y + 110,
               canyons[i].x_pos + canyons[i].width/4,floorPos_y + 95,
               canyons[i].x_pos + canyons[i].width * 3/4,floorPos_y + 95,
               canyons[i].x_pos + canyons[i].width, floorPos_y + 110);
        
        noStroke();
        fill(169,132,79);
        ellipse(canyons[i].x_pos + canyons[i].width/2,
                floorPos_y + 130,
                canyons[i].width, 30);
        rect(canyons[i].x_pos, floorPos_y + 130, canyons[i].width,40)
        
        fill(92,40,0);
        strokeWeight(5);
        stroke(92,40,0);
        beginShape();
        vertex(canyons[i].x_pos + canyons[i].width * 3/4,floorPos_y + 120);
        vertex(canyons[i].x_pos + canyons[i].width * 3/4, floorPos_y + 20);
        endShape();
        
        beginShape();
        vertex(canyons[i].x_pos + canyons[i].width * 13/14,floorPos_y + 130);
        vertex(canyons[i].x_pos + canyons[i].width * 13/14, floorPos_y + 20);
        endShape();
        
        beginShape();
        vertex(canyons[i].x_pos + canyons[i].width * 3/4,floorPos_y + 40);
        vertex(canyons[i].x_pos + canyons[i].width * 13/14, floorPos_y + 50);
        endShape();
        beginShape();
        vertex(canyons[i].x_pos + canyons[i].width * 3/4,floorPos_y + 60);
        vertex(canyons[i].x_pos + canyons[i].width * 13/14, floorPos_y + 70);
        endShape();
        beginShape();
        vertex(canyons[i].x_pos + canyons[i].width * 3/4,floorPos_y + 80);
        vertex(canyons[i].x_pos + canyons[i].width * 13/14, floorPos_y + 90);
        endShape();
        beginShape();
        vertex(canyons[i].x_pos + canyons[i].width * 3/4,floorPos_y + 100);
        vertex(canyons[i].x_pos + canyons[i].width * 13/14, floorPos_y + 110);
        endShape();
    }
}

function drawCharacter()
{
    //Character cannot go past 1870
    if(gameChar_x > 1870)
    {
        gameChar_x = 1870;
    }
	//the game character
	if(isLeft && isFalling)
	{
		// add your jumping-left code
        // moves to the left by 8 pixels when jumping
        gameChar_x -= 8;

        //head
        fill(255,224,189);
        ellipse(gameChar_x, gameChar_y - 50, 20,20);

        //hat of robber, over head
        fill(47,79,79);
        arc(gameChar_x, gameChar_y - 55, 20, 20, PI, TWO_PI); 
        ellipse(gameChar_x, gameChar_y - 65, 5,5);

        //mask & eye and smirk on left side
        fill(0);
        ellipse(gameChar_x, gameChar_y - 53, 20, 7);
        stroke(1);
        ellipse(gameChar_x - 7, gameChar_y - 45, 5,5);

        //back of mask
        triangle(gameChar_x + 10, gameChar_y - 53, 
                 gameChar_x + 15, gameChar_y - 56,
                 gameChar_x + 15, gameChar_y - 50);
        //eye
        fill(255,255,255);
        ellipse(gameChar_x - 8, gameChar_y - 53, 5,5);

        //body
        //white stripes in order
        rect(gameChar_x - 6, gameChar_y - 40, 12,3);
        rect(gameChar_x - 6, gameChar_y - 34, 12,3);
        rect(gameChar_x - 6, gameChar_y - 28, 12,3);

        //black stripes in order
        fill(0);
        rect(gameChar_x - 6, gameChar_y - 37, 12,3);
        rect(gameChar_x - 6, gameChar_y - 31, 12,3);

        //shoes
        fill(255,0,0);
        ellipse(gameChar_x + 11, gameChar_y - 10, 11,5);
        ellipse(gameChar_x - 17, gameChar_y - 16, 11,5);

        //left leg
        fill(70);
        quad(gameChar_x - 2 , gameChar_y - 25,
             gameChar_x + 6 , gameChar_y - 25,
             gameChar_x + 16 ,gameChar_y - 12,
             gameChar_x + 9 , gameChar_y - 12);

        //right leg, moved x by 10 in each direction to make legs wider
        quad(gameChar_x + 2 , gameChar_y - 25,
             gameChar_x - 6 , gameChar_y - 25,
             gameChar_x - 20, gameChar_y - 18,
             gameChar_x - 10, gameChar_y - 18);

        //arms
        quad(gameChar_x - 4, gameChar_y - 38,
             gameChar_x + 2, gameChar_y - 38,
             gameChar_x - 1, gameChar_y - 52,
             gameChar_x - 5, gameChar_y - 52);

        //hands placed here as goes over most things 
        fill(255,0,0);
        ellipse(gameChar_x - 3, gameChar_y - 52, 5 , 5);
	}
    // -----------------------------------------------------------
	else if(isRight && isFalling)
	{
		// add your jumping-right code
        // moves 6.5 pixels when jumping to the right
        gameChar_x += 8;
        
        //head
        fill(255,224,189);
        ellipse(gameChar_x, gameChar_y - 50, 20,20);

        //hat of robber, over head
        fill(47,79,79);
        arc(gameChar_x, gameChar_y - 55, 20, 20, PI, TWO_PI); 
        ellipse(gameChar_x, gameChar_y - 65, 5,5);

        //mask & eye and smirk on left side
        fill(0);
        ellipse(gameChar_x, gameChar_y - 53, 20, 7);
        stroke(1);
        ellipse(gameChar_x + 7, gameChar_y - 45, 5,5);

        //back of mask
        triangle(gameChar_x - 10, gameChar_y - 53, 
                 gameChar_x - 15, gameChar_y - 56,
                 gameChar_x - 15, gameChar_y - 50);
        //eye
        fill(255,255,255);
        ellipse(gameChar_x + 8, gameChar_y - 53, 5,5);

        //body & white stripes in order
        rect(gameChar_x - 6, gameChar_y - 40, 12,3);
        rect(gameChar_x - 6, gameChar_y - 34, 12,3);
        rect(gameChar_x - 6, gameChar_y - 28, 12,3);

        //black stripes in order
        fill(0);
        rect(gameChar_x - 6, gameChar_y - 37, 12,3);
        rect(gameChar_x - 6, gameChar_y - 31, 12,3);

        //shoes
        fill(255,0,0);
        ellipse(gameChar_x - 11, gameChar_y - 10, 11,5);
        ellipse(gameChar_x + 17, gameChar_y - 16, 11,5);
        
        //left leg
        fill(70);
        quad(gameChar_x - 6 , gameChar_y - 25,
             gameChar_x + 2 , gameChar_y - 25,
             gameChar_x - 9 , gameChar_y - 12,
             gameChar_x - 16, gameChar_y - 12);

        //right leg, moved x by 10 in each direction to make legs wider
        quad(gameChar_x + 6 , gameChar_y - 25,
             gameChar_x - 2 , gameChar_y - 25,
             gameChar_x + 10, gameChar_y - 18,
             gameChar_x + 20, gameChar_y - 18);

        //arms
        quad(gameChar_x - 4 , gameChar_y - 38,
             gameChar_x + 2 , gameChar_y - 38,
             gameChar_x + 5 , gameChar_y - 52,
             gameChar_x + 1 , gameChar_y - 52);

        //hands placed here as goes over most things 
        fill(255,0,0);
        ellipse(gameChar_x + 3, gameChar_y - 52, 5 , 5);
	}
    // -----------------------------------------------------------
	else if(isLeft)
	{
		// add your walking left code
        // Character walks left 5 pixels
        gameChar_x -= 5;     
        
        noStroke();
        //head
        fill(255,224,189);
        ellipse(gameChar_x, gameChar_y - 50, 20,20);
    
        //hat of robber, over head
        fill(47,79,79);
        arc(gameChar_x, gameChar_y - 55, 20, 20, PI, TWO_PI); 
        ellipse(gameChar_x, gameChar_y - 65, 5,5);
        
        //mask & eye and smirk on left side
        fill(0);
        ellipse(gameChar_x, gameChar_y - 53, 20, 7);
        bezier(gameChar_x - 8, gameChar_y - 43,
               gameChar_x - 4, gameChar_y - 43,
               gameChar_x - 2, gameChar_y - 49,
               gameChar_x - 2, gameChar_y - 49);
    
        //back of mask
        stroke(1);
        triangle(gameChar_x + 10, gameChar_y - 53, 
                 gameChar_x + 15, gameChar_y - 56,
                 gameChar_x + 15, gameChar_y - 50);

        fill(255,255,255);
        ellipse(gameChar_x - 8, gameChar_y - 53, 5,5);
    
        //body
        //white stripes in order
        rect(gameChar_x - 6, gameChar_y - 40, 12,3);
        rect(gameChar_x - 6, gameChar_y - 34, 12,3);
        rect(gameChar_x - 6, gameChar_y - 28, 12,3);
    
        //black stripes in order
        fill(0);
        rect(gameChar_x - 6, gameChar_y - 37, 12,3);
        rect(gameChar_x - 6, gameChar_y - 31, 12,3);
    
        //shoes
        fill(255,0,0);
        ellipse(gameChar_x, gameChar_y - 10, 11,10);
    
        //legs from side 
        fill(70);
        quad(gameChar_x - 6, gameChar_y - 25,
             gameChar_x + 6, gameChar_y - 25,
             gameChar_x + 5, gameChar_y - 10,
             gameChar_x - 3, gameChar_y - 10);
    
        //arms from side
        quad(gameChar_x - 4, gameChar_y - 38,
             gameChar_x + 2, gameChar_y - 38,
             gameChar_x - 1, gameChar_y - 22,
             gameChar_x - 5, gameChar_y - 22);
    
        //hands placed here as goes over most things 
        fill(255,0,0);
        ellipse(gameChar_x - 3, gameChar_y - 22, 5 , 5);
	}
    // -----------------------------------------------------------
	else if(isRight)
	{
		// add your walking right code
        gameChar_x += 5;
        
        //head
        fill(255,224,189);
        ellipse(gameChar_x, gameChar_y - 50, 20,20);
    
        //hat of robber, over head
        fill(47,79,79);
        arc(gameChar_x, gameChar_y - 55, 20, 20, PI, TWO_PI); 
        ellipse(gameChar_x, gameChar_y - 65, 5,5);
    
        //mask & eye and smirk on left side
        fill(0);
        ellipse(gameChar_x, gameChar_y - 53, 20, 7);
        stroke(1);
        line(gameChar_x + 7, gameChar_y - 45,
             gameChar_x + 3, gameChar_y - 46);
    
        //back of mask
        triangle(gameChar_x - 10, gameChar_y - 53, 
                 gameChar_x - 15, gameChar_y - 56,
                 gameChar_x - 15, gameChar_y - 50);
        //eye
        fill(255,255,255);
        ellipse(gameChar_x + 8, gameChar_y - 53, 5,5);
        //body
        //white stripes in order
        rect(gameChar_x - 6, gameChar_y - 40, 12,3);
        rect(gameChar_x - 6, gameChar_y - 34, 12,3);
        rect(gameChar_x - 6, gameChar_y - 28, 12,3);

        //black stripes in order
        fill(0);
        rect(gameChar_x - 6, gameChar_y - 37, 12,3);
        rect(gameChar_x - 6, gameChar_y - 31, 12,3);

        //shoes
        fill(255,0,0);
        ellipse(gameChar_x, gameChar_y - 10, 11,10);

        //legs from side 
        fill(70);
        quad(gameChar_x - 6 , gameChar_y - 25,
             gameChar_x + 6 , gameChar_y - 25,
             gameChar_x + 3 , gameChar_y - 10,
             gameChar_x - 6 , gameChar_y - 10);

        //arms
        quad(gameChar_x - 4 , gameChar_y - 38,
             gameChar_x + 2 , gameChar_y - 38,
             gameChar_x + 5 , gameChar_y - 22,
             gameChar_x + 1 , gameChar_y - 22);

        //hands placed here as goes over most things 
        fill(255,0,0);
        ellipse(gameChar_x + 3, gameChar_y - 22, 5 , 5);
	}
    // -----------------------------------------------------------
	else if(isFalling)
	{
		// add your jumping facing forwards code
        noStroke();
        //head
        fill(255,224,189);
        ellipse(gameChar_x, gameChar_y - 50, 20,20);

        //hat of robber, over head
        fill(47,79,79);
        arc(gameChar_x, gameChar_y - 55, 20, 20, PI, TWO_PI); 
        ellipse(gameChar_x, gameChar_y - 65, 5,5);

        //hands placed here as goes over most things 
        fill(255,0,0);
        ellipse(gameChar_x + 20, gameChar_y - 52, 5 , 5);
        ellipse(gameChar_x - 20, gameChar_y - 52, 5 , 5);

        //robber mask and eyes
        fill(0);
        stroke(0);
        ellipse(gameChar_x, gameChar_y - 52, 17, 7);
        fill(255,255,255);
        ellipse(gameChar_x - 4, gameChar_y - 51,5,5);
        ellipse(gameChar_x + 4, gameChar_y - 51,5,5);
        fill(0);    
        ellipse(gameChar_x, gameChar_y - 44, 5,5);
        
        fill(255,255,255);  //body 
        quad(gameChar_x - 5 , gameChar_y - 40,
             gameChar_x + 5 , gameChar_y - 40, 
             gameChar_x + 15, gameChar_y - 36,
             gameChar_x - 15, gameChar_y - 36);

        rect(gameChar_x - 10, gameChar_y - 32, 20,4); //white stripes
        rect(gameChar_x - 10, gameChar_y - 24, 20,4);

        fill(0); // colour set to black
        rect(gameChar_x - 10, gameChar_y - 36, 20, 4); //black stripes
        rect(gameChar_x - 10, gameChar_y - 28, 20, 4);

        //shoes before legs so it is underneath
        fill(255,0,0);
        ellipse(gameChar_x - 15,gameChar_y - 12,9,7);
        ellipse(gameChar_x + 15,gameChar_y - 12,9,7);

        fill(70);
        //arms now up since jumping
        quad(gameChar_x - 16, gameChar_y - 36,
             gameChar_x - 10, gameChar_y - 36,
             gameChar_x - 18, gameChar_y - 50,
             gameChar_x - 22, gameChar_y - 50);
        
        //right arm
        quad(gameChar_x + 16, gameChar_y - 36,
             gameChar_x + 10, gameChar_y - 36,
             gameChar_x + 18, gameChar_y - 50,
             gameChar_x + 22, gameChar_y - 50);

        //left leg
        quad(gameChar_x - 10, gameChar_y - 20,
             gameChar_x ,     gameChar_y - 20,
             gameChar_x - 13, gameChar_y - 12,
             gameChar_x - 20, gameChar_y - 12);

        //right leg, moved x by 10 in each direction to make legs wider
        quad(gameChar_x + 10, gameChar_y - 20,
             gameChar_x ,     gameChar_y - 20,
             gameChar_x + 13, gameChar_y - 12,
             gameChar_x + 20, gameChar_y - 12);
	}
    // -----------------------------------------------------------
	else
	{
		// add your standing front facing code
        //head
        noStroke();
        fill(255,224,189);
        ellipse(gameChar_x, gameChar_y - 50, 20,20);

        //hat of robber, over head
        fill(47,79,79);
        arc(gameChar_x, gameChar_y - 55, 20, 20, PI, TWO_PI); // semi circle
        ellipse(gameChar_x, gameChar_y - 65, 5,5); // bobble of hat
    
        //hands placed here as goes over most things 
        fill(255,0,0);
        ellipse(gameChar_x + 15, gameChar_y - 18, 5 , 5);
        ellipse(gameChar_x - 15, gameChar_y - 18, 5 , 5);
    
        //robber mask and eyes
        stroke(0);
        fill(0);
        ellipse(gameChar_x, gameChar_y - 52, 17, 7); 
        
        //two white eyes
        fill(255,255,255);
        ellipse(gameChar_x - 4, gameChar_y - 51,5,5); 
        ellipse(gameChar_x + 4, gameChar_y - 51,5,5);
    
        //robber smile
        noFill();
        bezier(gameChar_x - 5, gameChar_y - 43,
               gameChar_x + 5, gameChar_y - 40,
               gameChar_x + 6, gameChar_y - 47,
               gameChar_x + 6, gameChar_y - 47);
        //body
        fill(255,255,255); 
        //upper chest/ shoulders
        quad(gameChar_x - 5 , gameChar_y - 40,
             gameChar_x + 5 , gameChar_y - 40, 
             gameChar_x + 15, gameChar_y - 36,
             gameChar_x - 15, gameChar_y - 36);
    
        //white stripes
        rect(gameChar_x - 10, gameChar_y - 32, 20,4); 
        rect(gameChar_x - 10, gameChar_y - 24, 20,4);
        fill(0);
        
        //black stripes
        rect(gameChar_x - 10, gameChar_y - 36, 20, 4); 
        rect(gameChar_x - 10, gameChar_y - 28, 20, 4);
        //shoes before legs so its under
        fill(255,0,0);
        ellipse(gameChar_x - 6,gameChar_y - 5,7,8);
        ellipse(gameChar_x + 6,gameChar_y - 5,7,8);
    
        // left leg
        fill(70);
        quad(gameChar_x - 10,gameChar_y - 20,
             gameChar_x , gameChar_y - 20,
             gameChar_x - 3 ,gameChar_y - 5 ,
             gameChar_x - 10,gameChar_y - 5 );
    
        //right leg
        quad(gameChar_x + 10, gameChar_y - 20,
             gameChar_x ,     gameChar_y - 20,
             gameChar_x + 3 , gameChar_y - 5 ,
             gameChar_x + 10, gameChar_y - 5);
    
        // left arm
        quad(gameChar_x - 16, gameChar_y - 36,
             gameChar_x - 10, gameChar_y - 36,
             gameChar_x - 13, gameChar_y - 20,
             gameChar_x - 17, gameChar_y - 20);
        //right arm
        quad(gameChar_x + 16, gameChar_y - 36,
             gameChar_x + 10, gameChar_y - 36,
             gameChar_x + 13, gameChar_y - 20,
             gameChar_x + 17, gameChar_y - 20);
	}
}

function plummetingInteraction()
{
    //checks whether character is in range of canyon
    for(var i = 0; i <  canyons.length; i++)
    {
        if (gameChar_x > canyons[i].x_pos + 5 &&
            gameChar_x < canyons[i].x_pos - 5 + canyons[i].width &&
            gameChar_y >= floorPos_y)
        {
            isPlummeting = true;
        }
    }
    
    //freezes and drops player if they are plummeting
    if (isPlummeting)
    {
        gameChar_y += 4;
        isFalling = true;
        isLeft = false;
        isRight = false;
    }
    
    fill(255,0,0);
    if(gameChar_x == -1100)
    {
        isPlummeting = false;
        gameChar_y = floorPos_y;
    }
}

//this function handles gravity and also making sure that 
//the character can stay on a platform without falling
function gravity()
{
    //if it hasnt touched any platform, character falls normally
    if (gameChar_y < floorPos_y && !touchedPlatform1)
    {
        gameChar_y += 4;
        isFalling = true;
    }
    else if(gameChar_y < platforms[0].y_pos && touchedPlatform1)
    {
        gameChar_y += 4;
        isFalling = true;
    }
    else if(gameChar_y == platforms[0].y_pos && touchedPlatform1)
    {
        isFalling = false;
    }
    else
    {
        isFalling = false;
    }
    
    if(gameChar_y > height)
    {
        gameOver = true;
    }
}

function gameEndInteractions()
{
    if(gameOver && !levelComplete)
    {   
        if(key == "R" || key == "r")
        {    
            gameOver = false;
            gameChar_x = -1100;
            gameChar_y = floorPos_y;
            helicopter_y = floorPos_y - 50;
            helicopter_x = 2000;
            isPlummeting = false;
            helicopterPlummeting = false;
            insideHelicopter = false;
            isRight = false;
            isLeft = false;
            isFalling = false;
            isPlummeting = false;
            gameScore = 0;
            
            /*This code makes sure that gems you have already
            collected do not respawn if you have reached a 
            checkpoint which is past those gems, otherwise
            otherwise they do respawn*/
            
            for(var i = 0; i < collectables.length; i++)
            {
                collectables[i].isFound = false;
                
                for(var j = 0; j < checkpoints.length; j++)
                {
                    if(collectables[i].x_pos < checkpoints[j].x_pos + 200 && checkpoints[j].isReached)
                    {
                        collectables[i].isFound = true;
                        if(checkpoints[j].isReached)
                        {
                            gameScore = 4 + j * 4;                          
                        }
                    }         
                }
            }
            
            //when game restarts, char will respawn at checkpoint
            for(var i = 0; i < checkpoints.length; i++)
            {
                if(checkpoints[i].isReached)
                {
                    gameChar_x = checkpoints[i].x_pos;
                }
            }
            return;
        }
    }
    
    if(gameOver && insideHelicopter)
    {
        helicopterUp = false;
        helicopterRight = false;
    }
    
    if(levelComplete)
    {
        return;
    }
}

function helicopterCrash()
{ 
    //if helicopter is off the screen,game over
    if(helicopter_y > height)
    {
        gameOver = true;
    }    
    
    // if helicopter touches top of screen, starts to plummet
    if(helicopter_y < 0)
    {
        helicopterPlummeting = true;
    }
}

function drawGround()
{
    //This piece of code makes it so that the original ground
    //is translated and it switches to water instead
	noStroke();
	fill(145, 142, 133);
    if(gameChar_x > 1000 && !insideHelicopter)
    {
        push();
        translate(-cameraPosX, 0);
        rect(0,floorPos_y,2200,height - floorPos_y); 
        fill(103, 193, 202);
        rect(2200,floorPos_y + 100, width, height-floorPos_y);
        pop();
    }
    else if(helicopter_x >= 2000 && insideHelicopter)
    {
        //makes water stay on bottom of screen
        fill(103, 193, 202);
        rect(0,floorPos_y + 100, width, height-floorPos_y);
        push();
        translate(-helicopterCamera, 0);
        fill(145, 142, 133);
        rect(0,floorPos_y,2000,height - floorPos_y); 
        pop();
    }
    else
    {
        //original ground is not translated
        rect(0,floorPos_y,width,height - floorPos_y);
    }
}

function gameSound()
{
    //plays helicopter sound when inside
    if(insideHelicopter)
    {
        helicopterSound.play(); 
        helicopterSound.loop();        
    }
    
    //when level complete, helicopter sound stopped 
    if(flagpole.isReached && helicopterSound.isPlaying())
    {
        helicopterSound.stop();
        victorySound.play();
    }
    
    // when inside helicopter, no siren sounds
    if(insideHelicopter && !flagpole.isReached)
    {
        sirenSound.stop();
    }

    //plays winning sound
    if(flagpole.isReached)
    {
        //victory sound
        helicopterSound.stop();
    }
    
    //if game char dies, game over sound plays
    if(gameChar_y > floorPos_y + 50)
    {
        gameOverSound.play();
    }
    
    if(helicopterPlummeting)
    {
        helicopterCrashSound.play();
    }
}

function gameTipsText()
{
    stroke(0);
    strokeWeight(4);
    fill(255);
    textSize(20);
    textAlign(CENTER, CENTER);
    text("Score: " + gameScore, 100, 30);
    
    strokeWeight(6);
    textSize(35);
    if(!gameOver)
    {
        if(!insideHelicopter)
        {
            push();
            translate(-cameraPosX, 0);            
        }
        else
        {
            push();
            translate(-helicopterCamera, 0);
        }

        text("Use Arrow Keys / WASD", -1300,170);
        text("to move", -1300,240);
        text("Press 'G' to create", -50,145);
        text("a Shield", -50,185);
        fill(100,200,0);
        text("----> This Way", -1300,300);
        text("Jump over the Sewers", -650,100);
        text("and steal ALL the Gems", -650,170);
        fill(255,0,0);
        text("or else you FAIL", -650,240);
        fill(100,200,0);
        text("These are Checkpoints", -50,100);
        text("Press 'E' to enter the", 1800, 100);
        text("helicopter", 1800, 160);
        if(!levelComplete)
        {
            text("Land on the Helipad", 5350, 100);    
        }
        pop();    
    }
}

function gameStateText()
{
    if(gameOver)
    {
        strokeWeight(10);
        stroke(0);
        fill(200,0,0);
        textSize(100);
        text('Game Over', width/2, height/2);
        textSize(50);
        text('Tap "R" to Retry', width/2, height/2 + 100);
    }
    
    if(levelComplete)
    {
        isPlummeting = false;
    }
    if(flagpole.isReached)
    {
        fill(0,150,0)
        textSize(100);
        text('Level Complete!', width/2, height/2);
        textSize(50);
        text('Thanks for Playing', width/2, height/2 + 100);
    }
}

function obstaclesInteraction()
{
    noStroke();
    fill(70);
    for(var i = 0; i < obstaclesTop.length; i++)
    {
        //draws the bottom obstacles
        rect(obstaclesBottom[i].x_pos, obstaclesBottom[i].y_pos,
             obstaclesBottom[i].width, obstaclesBottom[i].height);
        
        //detects whether helicopter is in range of obstacle
        if(helicopter_x + 40 > obstaclesBottom[i].x_pos &&
           helicopter_x - 40 < obstaclesBottom[i].x_pos + obstaclesBottom[i].width &&
           helicopter_y > 546 - obstaclesBottom[i].height)
        {
            helicopterPlummeting = true;
        }
        
        //draws the top obstacles
        rect(obstaclesTop[i].x_pos,obstaclesTop[i].y_pos,
             obstaclesTop[i].width,obstaclesTop[i].height);
        
        //detects whether helicopter is in range of obstacle
        if(helicopter_x + 40 > obstaclesTop[i].x_pos &&
           helicopter_x - 40 < obstaclesTop[i].x_pos + 
           obstaclesTop[i].width &&
           helicopter_y - 30 < obstaclesTop[i].height)
        {
            helicopterPlummeting = true;
        }
    }

    if (helicopterPlummeting)
    {
        helicopter_y += 4;
        helicopterRight = false;
        helicopterUp = false;
    }
}

function drawHelicopter()
{
    if(!gameOver || !levelComplete)
    {
        if(helicopterRight)
        {
            helicopter_x += 6;

            //Helicopter Landing Skids
            noFill();
            stroke(0);
            strokeWeight(5);
            beginShape();
            vertex(helicopter_x - 10, helicopter_y + 35);
            vertex(helicopter_x - 10, helicopter_y + 45);
            vertex(helicopter_x - 30, helicopter_y + 45);
            vertex(helicopter_x + 30, helicopter_y + 45);
            vertex(helicopter_x + 40, helicopter_y + 35);
            vertex(helicopter_x + 30, helicopter_y + 45);
            vertex(helicopter_x + 10, helicopter_y + 45);
            vertex(helicopter_x + 10, helicopter_y + 35);
            endShape();

            //Helicopter Body
            fill(255,0,0);
            strokeWeight(1);
            beginShape();
            vertex(helicopter_x - 10, helicopter_y + 35);
            vertex(helicopter_x + 10, helicopter_y + 35);
            vertex(helicopter_x + 40, helicopter_y + 25);
            vertex(helicopter_x + 45, helicopter_y + 20);
            vertex(helicopter_x + 50, helicopter_y);
            vertex(helicopter_x + 32, helicopter_y - 18);
            vertex(helicopter_x + 15, helicopter_y - 20);
            vertex(helicopter_x - 5, helicopter_y - 25);
            vertex(helicopter_x - 25, helicopter_y - 20);
            vertex(helicopter_x - 42, helicopter_y - 20);
            vertex(helicopter_x - 50, helicopter_y - 5);
            vertex(helicopter_x - 80, helicopter_y - 5);
            vertex(helicopter_x - 90, helicopter_y - 20);
            vertex(helicopter_x - 95, helicopter_y - 20);
            vertex(helicopter_x - 90, helicopter_y);
            vertex(helicopter_x - 105, helicopter_y);
            vertex(helicopter_x - 105, helicopter_y + 5);
            vertex(helicopter_x - 50, helicopter_y + 15);
            endShape();

            //Helicopter windshield
            fill(173,216,230);
            noStroke();
            beginShape();
            vertex(helicopter_x + 45, helicopter_y);
            vertex(helicopter_x + 27, helicopter_y - 16);
            vertex(helicopter_x - 4, helicopter_y - 13);
            vertex(helicopter_x - 10, helicopter_y);
            vertex(helicopter_x + 35, helicopter_y + 6);
            endShape();

            //Helicopter Rotors
            noFill();
            stroke(0);
            strokeWeight(5);
            beginShape()
            vertex(helicopter_x - 5, helicopter_y - 25);
            vertex(helicopter_x - 65, helicopter_y - 35);
            vertex(helicopter_x - 5, helicopter_y - 25);
            vertex(helicopter_x + 65, helicopter_y - 35);
            vertex(helicopter_x - 5, helicopter_y - 25);
            vertex(helicopter_x - 65, helicopter_y);
            vertex(helicopter_x - 5, helicopter_y - 25);
            vertex(helicopter_x + 65, helicopter_y);
            endShape();  
        }

        else if(helicopterUp)
        {
            helicopter_y -= 13/2;

            //Helicopter Landing Skids
            noFill();
            stroke(0);
            strokeWeight(5);
            beginShape();
            vertex(helicopter_x - 10, helicopter_y + 35);
            vertex(helicopter_x - 10, helicopter_y + 45);
            vertex(helicopter_x - 30, helicopter_y + 45);
            vertex(helicopter_x + 30, helicopter_y + 45);
            vertex(helicopter_x + 40, helicopter_y + 35);
            vertex(helicopter_x + 30, helicopter_y + 45);
            vertex(helicopter_x + 10, helicopter_y + 45);
            vertex(helicopter_x + 10, helicopter_y + 35);
            endShape();

            //Helicopter Body
            fill(255,0,0);
            strokeWeight(1);
            beginShape();
            vertex(helicopter_x - 10, helicopter_y + 35);
            vertex(helicopter_x + 10, helicopter_y + 35);
            vertex(helicopter_x + 40, helicopter_y + 25);
            vertex(helicopter_x + 45, helicopter_y + 20);
            vertex(helicopter_x + 50, helicopter_y);
            vertex(helicopter_x + 32, helicopter_y - 18);
            vertex(helicopter_x + 15, helicopter_y - 20);
            vertex(helicopter_x - 5, helicopter_y - 25);
            vertex(helicopter_x - 25, helicopter_y - 20);
            vertex(helicopter_x - 42, helicopter_y - 20);
            vertex(helicopter_x - 50, helicopter_y - 5);
            vertex(helicopter_x - 80, helicopter_y - 5);
            vertex(helicopter_x - 90, helicopter_y - 20);
            vertex(helicopter_x - 95, helicopter_y - 20);
            vertex(helicopter_x - 90, helicopter_y);
            vertex(helicopter_x - 105, helicopter_y);
            vertex(helicopter_x - 105, helicopter_y + 5);
            vertex(helicopter_x - 50, helicopter_y + 15);
            endShape();

            //Helicopter Windshield
            fill(173,216,230);
            noStroke();
            beginShape();
            vertex(helicopter_x + 45, helicopter_y);
            vertex(helicopter_x + 27, helicopter_y - 16);
            vertex(helicopter_x - 4, helicopter_y - 13);
            vertex(helicopter_x - 10, helicopter_y);
            vertex(helicopter_x + 35, helicopter_y + 6);
            endShape();

            //Helicopter Rotors
            noFill();
            stroke(0);
            strokeWeight(5);
            beginShape()
            vertex(helicopter_x - 5, helicopter_y - 25);
            vertex(helicopter_x - 65, helicopter_y - 35);
            vertex(helicopter_x - 5, helicopter_y - 25);
            vertex(helicopter_x + 65, helicopter_y - 35);
            vertex(helicopter_x - 5, helicopter_y - 25);
            vertex(helicopter_x - 65, helicopter_y);
            vertex(helicopter_x - 5, helicopter_y - 25);
            vertex(helicopter_x + 65, helicopter_y);
            endShape();
        }

        if(helicopterUp && helicopterRight)
        {
            helicopter_y -= 2;
            helicopter_x += 4;
        }
        else
        {
            //Landing skids
            noFill();
            stroke(0);
            strokeWeight(5);
            beginShape();
            vertex(helicopter_x - 10, helicopter_y + 35);
            vertex(helicopter_x - 10, helicopter_y + 45);
            vertex(helicopter_x - 30, helicopter_y + 45);
            vertex(helicopter_x + 30, helicopter_y + 45);
            vertex(helicopter_x + 40, helicopter_y + 35);
            vertex(helicopter_x + 30, helicopter_y + 45);
            vertex(helicopter_x + 10, helicopter_y + 45);
            vertex(helicopter_x + 10, helicopter_y + 35);
            endShape();

            //Helicopter Body
            fill(255,0,0);
            strokeWeight(1);
            beginShape();
            vertex(helicopter_x - 10, helicopter_y + 35);
            vertex(helicopter_x + 10, helicopter_y + 35);
            vertex(helicopter_x + 40, helicopter_y + 25);
            vertex(helicopter_x + 45, helicopter_y + 20);
            vertex(helicopter_x + 50, helicopter_y);
            vertex(helicopter_x + 32, helicopter_y - 18);
            vertex(helicopter_x + 15, helicopter_y - 20);
            vertex(helicopter_x - 5, helicopter_y - 25);
            vertex(helicopter_x - 25, helicopter_y - 20);
            vertex(helicopter_x - 42, helicopter_y - 20);
            vertex(helicopter_x - 50, helicopter_y - 5);
            vertex(helicopter_x - 80, helicopter_y - 5);
            vertex(helicopter_x - 90, helicopter_y - 20);
            vertex(helicopter_x - 95, helicopter_y - 20);
            vertex(helicopter_x - 90, helicopter_y);
            vertex(helicopter_x - 105, helicopter_y);
            vertex(helicopter_x - 105, helicopter_y + 5);
            vertex(helicopter_x - 50, helicopter_y + 15);
            endShape();

            //Helicopter windshield
            fill(173,216,230);
            noStroke();
            beginShape();
            vertex(helicopter_x + 45, helicopter_y);
            vertex(helicopter_x + 27, helicopter_y - 16);
            vertex(helicopter_x - 4, helicopter_y - 13);
            vertex(helicopter_x - 10, helicopter_y);
            vertex(helicopter_x + 35, helicopter_y + 6);
            endShape();

            //Helicopter Rotors
            noFill();
            stroke(0);
            strokeWeight(5);
            beginShape()
            vertex(helicopter_x - 5, helicopter_y - 25);
            vertex(helicopter_x - 65, helicopter_y - 35);
            vertex(helicopter_x - 5, helicopter_y - 25);
            vertex(helicopter_x + 65, helicopter_y - 35);
            vertex(helicopter_x - 5, helicopter_y - 25);
            vertex(helicopter_x - 65, helicopter_y);
            vertex(helicopter_x - 5, helicopter_y - 25);
            vertex(helicopter_x + 65, helicopter_y);
            endShape();

            if(helicopter_x == 2000 && helicopter_y == floorPos_y - 50)
            {

            }
            else
            {
                 helicopter_y += 9/2;               
            }
        } 
    }
}

function createPlatforms()
{
    stroke(0);
    strokeWeight(5);
    fill(180);
    rect(platforms[0].x_pos, platforms[0].y_pos, platforms[0].width, 10);
    
    //checks if game character has touched the platform
    if(gameChar_x > platforms[0].x_pos - 10 &&
       gameChar_x < platforms[0].x_pos + platforms[0].width + 10 && 
       gameChar_y <= platforms[0].y_pos + 10)
    {
        touchedPlatform1 = true;
        if(gameChar_y == platforms[0].y_pos)
        {
            //raises y pos of game character
            gameChar_y = platforms[0].y_pos
        }
        else
        {
            isFalling = true;
        }
    }
    else
    {
        touchedPlatform1 = false;
    }
    
    rect(platforms[1].x_pos, platforms[1].y_pos, platforms[1].width, 10);
    
    //checks if game character has touched the platform
    if(gameChar_x > platforms[1].x_pos - 10 &&
       gameChar_x < platforms[1].x_pos + platforms[1].width + 10 && 
       gameChar_y <= platforms[1].y_pos + 10)
    {
        touchedPlatform1 = true;
        if(gameChar_y == platforms[1].y_pos)
        {
            //raises y pos of game character
            gameChar_y = platforms[1].y_pos
        }
        else
        {
            isFalling = true;
        }
    }
    else
    {
        touchedPlatform2 = false;
    }
}