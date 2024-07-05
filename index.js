// step 1
var gameColors = ["green", "red", "blue", "yellow"];
var gameGeneratedSequence = [];
var userClickSequence = [];
var gameStarted = false;
var gameLevel = 0;
var heading = document.querySelector("#level-title");

// step 2

function playSound(soundInput) {
    var audio = new Audio("/" + soundInput + ".mp3");
    audio.play();

}

// step 3
function nextLevel() {
    gameLevel++;
    userClickSequence = [];
    heading.innerHTML = "level " + gameLevel;
    var randomNumber = Math.random();
    randomNumber = (randomNumber * 4);
    randomNumber = Math.floor(randomNumber);
    var randomColor = gameColors[randomNumber];
    gameGeneratedSequence.push(randomColor);
    document.querySelector("#" + randomColor).classList.add("fade-in-out")

    setTimeout(function () {
        document.querySelector("#" + randomColor).classList.remove("fade-in-out");
    }, 100);
    playSound(randomColor);



}

// step 4

document.addEventListener("touchstart", function (event) {
    if (!gameStarted) {
        gameStarted = true;
        nextLevel();




    }
});

// step 5


function clickEffects(currentColor) {
    document.querySelector("#" + currentColor).classList.add("pressed")
    setTimeout(function () {
        document.querySelector("#" + currentColor).classList.remove("pressed");
    }, 100);




}


// step 6

function startAgain() {
    gameLevel = 0;
    gameGeneratedSequence = [];
    gameStarted = false;

}

// step 7


function validateAnswer(userLevel) {
    if (gameGeneratedSequence[userLevel] === userClickSequence[userLevel]) {
        if (gameGeneratedSequence.length === userClickSequence.length) {
            setTimeout(function () {
                nextLevel();
            }, 1000);

        }

    } else {
        playSound("wrong");
        document.body.classList.add("game-over");
        heading.innerHTML = "Game Over, Press any Key to Restart"
        setTimeout(function () {
            document.body.classList.remove("game-over");
        }, 200);
        startAgain();

    }

}


// step 8

for (var i = 0; i < 4; i++) {

    document.querySelectorAll(".btn")[i].addEventListener("click", function () {
        var userSelectedColor = this.id;

        userClickSequence.push(userSelectedColor)
        playSound(userSelectedColor);
        clickEffects(userSelectedColor);
        validateAnswer(userClickSequence.length - 1);




    });

}
