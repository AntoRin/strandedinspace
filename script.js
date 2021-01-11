var htmlHeight = document.documentElement.offsetHeight;
var container = document.querySelector(".container");
var containerHeight = container.offsetHeight;

window.onresize = ()=> {location.reload();}

// CHARACTER MOVEMENT
var character = document.querySelector(".character");
var characterImg = document.querySelector(".character img");
character.style.left = 5 + "%";
characterImg.style.height = (6.66666667 / 100) * containerHeight + "px";
characterImg.style.width = "auto";
// console.log(getComputedStyle(character).getPropertyValue("left"));
// console.log(getComputedStyle(character).getPropertyValue("width"));
// console.log(getComputedStyle(character).getPropertyValue("height"));
var displacement = (container.offsetHeight - characterImg.offsetHeight) / 5;
// console.log(characterImg.offsetHeight);
// console.log(displacement);
// console.log(container.offsetHeight);
// console.log(characterImg.offsetHeight);

var upBtn = document.getElementById("up");
var downBtn = document.getElementById("down");

upBtn.addEventListener("click", moveCharacter);
downBtn.addEventListener("click", moveCharacter);
window.addEventListener("keydown", moveCharacter);

function moveCharacter(event)
{
    if(event.keyCode == 38 || this.id == "up"){
        var topPos = character.offsetTop;
        
        var posRefTop = topPos;
        if(topPos > 1)
        {
            posRefTop -= displacement;
            if(posRefTop >= 0)
                character.style.top = posRefTop + "px";
        }
       
    }   
     if(event.keyCode == 40 || this.id == "down"){
        var bottomPos = character.offsetTop;
        console.log(bottomPos);
        var posRefBottom = bottomPos;
        
         if((posRefBottom + displacement) <= container.offsetHeight)
         {
            posRefBottom += displacement;
             character.style.top = posRefBottom + "px";
         }
        //  console.log(bottomPos);
     }
}
// CHARACTER MOVEMENT




// OBSTACLES 
var obstacleBottom = document.querySelector(".obstacleBottom");
var obstacleTop = document.querySelector(".obstacleTop");
// obstacleTop.style.height = 0 + "%";
// obstacleBottom.style.height = 80 + "%";
// var heightList = [[0,525],[525,0],[100,440],[430,100],[210,315],[320,210],[210,315],[315,210]];

var heightList = [[0,((87.5/100)*containerHeight)], [((87.5/100)*containerHeight),0], [((16.66666667/100)*containerHeight),((73.33333333/100)*containerHeight)], [((71.66666667/100)*containerHeight),((16.66666667/100)*containerHeight)], [((35/100)*containerHeight),((52.5/100)*containerHeight)], [((53.33333333/100)*containerHeight), ((35/100)*containerHeight)], [((35/100)*containerHeight), ((52.5/100)*containerHeight)], [((52.5/100)*containerHeight), ((35/100)*containerHeight)]];
// console.log(heightList);
var listLength = heightList.length;
var score = 0;
var highscore = 0;

function changeHeight()
{

    var random = Math.floor(Math.random() * 8 + 0);
    // console.log(random);

    obstacleBottom.style.height = heightList[random][0]  + "px";
    obstacleTop.style.height = heightList[random][1]  + "px";

    score++;
    if(score > highscore)
        highscore = score;
    
    document.querySelector(".getScore").innerHTML = score;
    document.querySelector(".getHighScore").innerHTML = highscore;
}
// OBSTACLES 




// START GAME 
var start = document.getElementById("start");
var game; // setInterval(changeHeight, 1000);
var checkDefeat; // setInterval(checkStatus, 10);
start.onclick = ()=>{
    if(getComputedStyle(character).getPropertyValue("visibility") === "hidden")
    {
        character.style.visibility = "visible";
    }
    character.style.display = "block";
    obstacleBottom.style.display = "block";
    obstacleTop.style.display = "block";
    game = setInterval(changeHeight, 2000);
    checkDefeat = setInterval(checkStatus, 10);
    obstacleTop.classList.add("animate");
    obstacleBottom.classList.add("animate");
    start.style.display = "none";
}
// START GAME 



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
            console.log(character.offsetTop);
            clearInterval(game);
            clearInterval(checkDefeat);
            alert("Defeat");
            score = 0;
            document.querySelector(".getScore").innerHTML = score;
            obstacleTop.classList.remove("animate");
            obstacleBottom.classList.remove("animate");
            start.style.display = "block";
            character.style.display = "none";
            obstacleBottom.style.display = "none";
            obstacleTop.style.display = "none";
            character.style.top = 0;
        }
    }
}
// END GAME 
