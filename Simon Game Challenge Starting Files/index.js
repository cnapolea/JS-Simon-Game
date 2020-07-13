((function game() {

    var colors = ["green", "red", "yellow", "blue"];
    var gamePattern = [];
    var userClickedPattern = [];
    var buttons = $(".btn");
    var level = 0;
    var started = false;

    function soundPlayer(color) {
        var btnAudio = new Audio();
        btnAudio.src = "/sounds/" + color + ".mp3";
        btnAudio.play();
    }

    function showPattern(color) {
        $("#" + color).fadeOut("fast").fadeIn("fast");
        soundPlayer(color);
    }

    function nextSequence() {
        var randInt = Math.floor(Math.random() * 4);
        var randomChosenColor = colors[randInt];
        gamePattern.push(randomChosenColor);
        $('#level-title').text("Level " + level);
        showPattern(randomChosenColor);
        level++;
    }

    function animatePress(currentColor) {
        $("#" + currentColor).addClass('pressed');
        setTimeout(() => {
            $("#" + currentColor).removeClass('pressed');
        }, 100);
    }

    function resetGame() {
        started = false;
        level = 0;
        gamePattern = [];
        userClickedPattern = [];
    }

    function animateGameOver () {
        resetGame();
        soundPlayer('wrong');
        $('#level-title').text("Game Over, Press A to Restart");
        $("body").addClass('game-over');
        setTimeout(() => {
            $("body").removeClass('game-over');
        }, 200);
    }

    function checkAnswer(currentLevel) {

        if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

            if (gamePattern.length === userClickedPattern.length && gamePattern.every(function (color, index) {
                    return color === userClickedPattern[index];
                })) {

                    setTimeout(() => {
                        nextSequence();
                    }, 1000);

                    userClickedPattern = [];
            }

        } else {
            animateGameOver();
        }
    }


    buttons.click(function () {
        var btnClicked = $(this);
        var userChosenColor = btnClicked[0].id;
        userClickedPattern.push(userChosenColor);
        animatePress(userChosenColor);
        soundPlayer(userChosenColor);
        checkAnswer(userClickedPattern.length - 1);
    });


    $(document).keypress(function (e) {

        if (!started) {
            if (e.key === "a") {
                nextSequence();
                started = true;
            }

        }
    });
})());