var buttonColours = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userClickedPattern = [];
var i = 1;
var started = false;

// ****************************************************************************
//Works only when value is true.
$(document).on("keypress", function() {
  if (!started) { //Works only when value is true.


    $("#level-title").text("Level " + i);
    nextSequence();
    started = true;
  }
});
// ****************************************************************************
// Machine Input
function nextSequence() {

  userClickedPattern = [];
  $("h1").text("Level " + i);
  i++;

  // Random Number Generator
  var randomNumber = Math.random();
  randomNumber = (randomNumber * 4);
  randomNumber = Math.floor(randomNumber);


  // Machine Input
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);


  //Calling Functions

  animate(gamePattern);

}

// *****************************************************************************

// User Input
$(".btn").on("click", handler);

function handler() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);


  // Calling Functions
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
}


// *****************************************************************************

// Sound Playing
function playSound(color) {
  var s1 = new Audio('sounds/' + color + '.mp3');
  s1.play();
}

// Animation Function
function animatePress(currentColour) {

  $("#" + currentColour).addClass("pressed-"+currentColour);

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed-"+currentColour);
  }, 200);
}

//*****************************************************************************

function animate(colors) {

colors.forEach((singleColor,index)=>{
setTimeout(function() {
  var s1 = new Audio('sounds/' + singleColor + '.mp3');
  s1.play();

// Animation Function

  $("#" + singleColor).addClass("pressed-"+singleColor);

  setTimeout(function() {
    $("#" + singleColor).removeClass("pressed-"+singleColor);
  },300);
}, index*900);
})

}






// ****************************************************************************
//Checking function
function checkAnswer(currentLevel) {
  console.log(currentLevel);


  if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {

    if (gamePattern.length == userClickedPattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  }


  else {
    playSound("wrong");

    $("body").addClass("game-over");

    setTimeout(function() {$("body").removeClass("game-over");}, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();

    }
}

// *****************************************************************************
// Restrating Game
function startOver(){
started=false;
gamePattern=[];
i=1;
}
