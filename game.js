var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;


// -------------------------------------------keypress event---------------------------------------
$(document).keypress(function() {
  if (!started) {

    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// ---------------------------------------- Click Event -----------------------
$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);


  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);  
  
});


  // -------------------------------------- nextSequence function ---------------
function nextSequence() {
  userClickedPattern = []; //reset for next level --> from check answer
  level++;

  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

//----------------------------------- playsound and animation -----------------------
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}


// ---------------------------------- check Answer () -----------------------------
function checkAnswer(currentLevel){

  //most recent answer
  if( gamePattern[currentLevel]===userClickedPattern[currentLevel]){
     console.log('success');
    if(gamePattern.length === userClickedPattern.length){
      setTimeout (function(){
        nextSequence();
      },1000);

    }
  else
    console.log('wrong');
  }
  else{
    playSound('wrong');
    $('body').addClass('game-over');
    $('#level-title').text ("Game Over, Press Any Key to Restart");
    setTimeout(function(){
      $('body').removeClass('game-over');
    },200);
    startOver();
  }
 
  
}


function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

