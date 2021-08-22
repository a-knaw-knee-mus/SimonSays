var buttonColours = ["red", "blue", "green", "yellow"];
var soundColours = ["red.mp3", "blue.mp3", "green.mp3", "yellow.mp3", "wrong.mp3"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var step = 0
var enableBtn = false

function nextSequence(){  
    level++
    step = 0
    $('#level-title').text('Level ' + level)
    enableBtn = false

    setTimeout(function(){
        userClickedPattern = []
        var randomNumber = Math.random()*4;
        randomNumber = Math.floor(randomNumber);
        var randomChosenColour = buttonColours[randomNumber];
        gamePattern.push(randomChosenColour);
        animatePress(gamePattern[gamePattern.length-1]);
        playSound(gamePattern[gamePattern.length-1]);
        enableBtn = true
    }, 1000)
}

$(".btn").on("click", function(){
    if (enableBtn){
        userClickedPattern.push(this.id)
        userClickedPattern[userClickedPattern.length-1] != gamePattern[userClickedPattern.length-1] ? gameOver() : playSound(this.id)
        step++
        if (step==level){
            nextSequence()
        }
        animatePress(this.id)
    }
})

function playSound(id) {
    var audio = new Audio('sounds/' + id + '.mp3');
    audio.volume = 0.01;
    audio.play();
}

function animatePress(id) {
    $("#" + id).fadeOut(100).fadeIn(100);
    $('#' + id).addClass('pressed')
    setTimeout(function(){
        $('#' + id).removeClass('pressed')
    }, 100)
}

function gameOver(){
    enableBtn = false
    playSound('wrong') 
    $('#level-title').html('GAME OVER. LEVELS COMPLETED: ' + (level-1) + ".<br> Press A to Start Again!")
    $('body').addClass('game-over')
    setTimeout(function(){
        $('body').removeClass('game-over')
    }, 100)
    level = 0
    $('#level-title').addClass('multi-line')
}

$(document).keypress(function(e){
    if (e.key == 'a' && level == 0){
        $('#level-title').removeClass('multi-line')
        enableBtn = true
        nextSequence()
        gamePattern = []
    }
})