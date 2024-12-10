let canvas;
    let context;
    let gameStarted = false;

        window.onload = init;
    

    function init(){
        canvas = document.getElementById('myCanvas');
        context = canvas.getContext('2d');

        // Start the first frame request
        window.requestAnimationFrame(gameLoop);
    }

    function gameLoop(timeStamp){
        draw();

        // Keep requesting new frames
        window.requestAnimationFrame(gameLoop);
    }

    function draw(){
        if (!gameStarted){
            context.font = "30px arial";
            context.strokeText = ("Hello World",100,300);
        }

    }