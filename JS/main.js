let canvas;
let context;
let gameStarted = false;


window.onload = init;

function init() {
    canvas = document.getElementById('myCanvas');
    context = canvas.getContext('2d');
    // Add event listener for mouse clicks
    canvas.addEventListener('click', handleClick);
    window.addEventListener('keydown', keyDownHandler);
    window.addEventListener('keyup', keyUpHandler);
    window.requestAnimationFrame(gameLoop);
}

function handleClick(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Check if the click is within the Start button
    if (x >= 300 && x <= 500 && y >= 300 && y <= 375) {
        gameStarted = true;
    }
}

function gameLoop(timeStamp) {
    update();
    draw();
    window.requestAnimationFrame(gameLoop);
}

function update(){
    player.x += player.speedX;
    player.y += player.speedY;

    if (player.x + player.width < 0) player.x = canvas.width; // Left to right
        if (player.x > canvas.width) player.x = -player.width;  // Right to left
        if (player.y + player.height < 0) player.y = canvas.height; // Top to bottom
        if (player.y > canvas.height) player.y = -player.height; // Bottom to top
};


function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    if (!gameStarted) {
        context.fillStyle = '#000000';
        context.fillRect(0, 0, canvas.width, canvas.height);

        // Draw title
        context.font = "100px Arial";
        context.strokeStyle = '#eeaa00';
        context.strokeText("Dodge n' Grab", 80, 200);

        // Draw Start button
        context.fillStyle = '#eeaa00';
        context.fillRect(300, 300, 200, 75);
        context.font = '35px Arial';
        context.fillStyle = '#000000'; 
        context.fillText("Start", 360, 349); 

        
    } else {
        context.fillStyle = '#000000';
        context.fillRect(0, 0, canvas.width, canvas.height);
        player.draw(context);
    }
}
