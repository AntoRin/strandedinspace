var htmlHeight = document.documentElement.offsetHeight;
var container = document.querySelector(".container");
var containerHeight = container.offsetHeight;

window.onresize = ()=> {location.reload();}
var touchButtons = document.querySelector(".touchButtons");
window.onload = ()=> {
    if(getComputedStyle(touchButtons).getPropertyValue("display") === "block")
    {
        touchButtons.style.visibility = "hidden";
    }
}




// CHARACTER MOVEMENT
var character = document.querySelector(".character");
var characterImg = document.querySelector(".character img");
character.style.left = 5 + "%";
characterImg.style.height = (6.66666667 / 100) * containerHeight + "px";
characterImg.style.width = "auto";
// console.log(getComputedStyle(character).getPropertyValue("height"));
var displacement = (container.offsetHeight - character.offsetHeight) / 5;
// console.log(displacement);
var upBtn = document.getElementById("up");
var downBtn = document.getElementById("down");


upBtn.addEventListener("click", moveCharacter);
downBtn.addEventListener("click", moveCharacter);
window.addEventListener("keydown", moveCharacter);

function moveCharacter(event)
{
    if(event.keyCode == 38 || this.id == "up"){
        var topPos = character.offsetTop;
        console.log(topPos);
        var posRefTop = topPos;
        if(topPos > 0)
        {
            posRefTop -= displacement;
            if(posRefTop >= 0)
                character.style.top = posRefTop + "px";
        }
       
    }   
     if(event.keyCode == 40 || this.id == "down"){
        var bottomPos = character.offsetTop;
        // console.log(bottomPos);
        var posRefBottom = bottomPos;
        
         if((posRefBottom + displacement) <= container.offsetHeight)
         {
            posRefBottom += displacement;
             character.style.top = posRefBottom + "px";
         }
     }
}
// xCHARACTER MOVEMENT




// OBSTACLES 
var obstacleBottom = document.querySelector(".obstacleBottom");
var obstacleTop = document.querySelector(".obstacleTop");

var heightList = [
    [0,((87.5/100)*containerHeight)], 
    [((87.5/100)*containerHeight),0], 
    [((16.66666667/100)*containerHeight),((73.33333333/100)*containerHeight)], 
    [((71.66666667/100)*containerHeight),((16.66666667/100)*containerHeight)], 
    [((35/100)*containerHeight),((52.5/100)*containerHeight)], 
    [((53.33333333/100)*containerHeight), ((35/100)*containerHeight)], 
    [((35/100)*containerHeight), ((52.5/100)*containerHeight)], 
    [((52.5/100)*containerHeight), ((35/100)*containerHeight)]
];

var listLength = heightList.length;
var score = 0;
var highscore = 0;

function changeHeight()
{

    var random = Math.floor(Math.random() * 8 + 0);
    obstacleBottom.style.height = heightList[random][0]  + "px";
    obstacleTop.style.height = heightList[random][1]  + "px";

    score++;
    if(score > highscore)
        highscore = score;
    
    document.querySelector(".getScore").innerHTML = score;
    document.querySelector(".getHighScore").innerHTML = highscore;
}
// xOBSTACLES 


//OPTIONS
var optionsBtn = document.getElementById("options");
var options = document.querySelector(".optionsMenu");
var back = document.getElementById("back");
back.onclick = () => {
    options.style.display = "none";
}
optionsBtn.onclick = () => {
    options.style.display = "block";
}

var map1 = document.getElementById("map1");
var map2 = document.getElementById("map2");

map1.onclick = (btn) => {
    var imageSource = document.getElementById("map1Image").src;
    container.style.backgroundImage = `url(${imageSource})`;
}
map2.onclick = (btn) => {
    var imageSource = document.getElementById("map2Image").src;
    container.style.backgroundImage = `url(${imageSource})`;
}
//xOPTIONS


// START GAME 
var start = document.getElementById("start");
var game; 
var checkDefeat; 
start.onclick = ()=>{
    // document.documentElement.requestFullscreen();
    if(getComputedStyle(character).getPropertyValue("visibility") === "hidden")
    {
        character.style.visibility = "visible";
    }
    if(touchButtons.style.visibility === "hidden")
    {
        touchButtons.style.visibility = "visible";
    }
    character.style.display = "block";
    obstacleBottom.style.display = "block";
    obstacleTop.style.display = "block";
    game = setInterval(changeHeight, 2000);
    checkDefeat = setInterval(checkStatus, 10);
    obstacleTop.classList.add("animate");
    obstacleBottom.classList.add("animate");
    start.style.display = "none";
    optionsBtn.style.display = "none";
}
// xSTART GAME 



// END GAME 


function checkStatus(){

    if(character.offsetTop < obstacleTop.offsetHeight || character.offsetTop > (obstacleTop.offsetHeight + characterImg.offsetHeight))
    {
        // console.log("char :", character.offsetTop);
        // console.log("ob height: ", obstacleTop.offsetHeight);
        // console.log("obheight + 100: ", obstacleTop.offsetHeight + 100);
        // console.log(obstacleTop.offsetRight);
        var obPos = parseInt(window.getComputedStyle(obstacleTop).getPropertyValue("right"));
        var charContainerWidth = character.offsetWidth - ((5/100) * container.offsetWidth);
        var charRightWidth = charContainerWidth - characterImg.offsetWidth;
        if(obPos < charContainerWidth && obPos > charRightWidth)
        {
            clearInterval(game);
            clearInterval(checkDefeat);
            alert("Defeat");
            score = 0;
            document.querySelector(".getScore").innerHTML = score;
            obstacleTop.classList.remove("animate");
            obstacleBottom.classList.remove("animate");
            start.style.display = "block";
            optionsBtn.style.display = "block";
            character.style.display = "none";
            obstacleBottom.style.display = "none";
            obstacleTop.style.display = "none";
            character.style.top = 0;
            if(touchButtons.style.visibility === "visible")
            {
                touchButtons.style.visibility = "hidden";
            }
        }
    }
}
// xEND GAME 
