let canvas;
let context;
let gameStarted = false;

let coins = [];
let enemies = [];  // Array to hold enemies
let score = 0;  // Variable to track score
const coinSize = 30; 
const totalCoins = 5;
const enemySize = 20; // Size of the enemies
const enemySpeed = 1; // Speed at which enemies follow the player


window.onload = init;

function init() {
    canvas = document.getElementById('myCanvas');
    context = canvas.getContext('2d');
    // Add event listener for mouse clicks
    canvas.addEventListener('click', handleClick);
    window.addEventListener('keydown', keyDownHandler);
    window.addEventListener('keyup', keyUpHandler);
    generateCoins(totalCoins);
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

function generateCoins(numCoins) {
    coins = [];  // Clear the array of coins before regenerating
    for (let i = 0; i < numCoins; i++) {
        let coin = {
            x: Math.random() * (canvas.width - coinSize),
            y: Math.random() * (canvas.height - coinSize),
            width: coinSize,
            height: coinSize
        };
        coins.push(coin);
    }
}

function spawnEnemy() {
    // Create a new enemy with random starting position
    let enemy = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        width: enemySize,
        height: enemySize,
        moveTowardsPlayer: function() {
            let dx = player.x - this.x;
            let dy = player.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance > 1) {
                this.x += dx / distance * enemySpeed;
                this.y += dy / distance * enemySpeed;
            }
        },
        draw: function(context) {
            context.fillStyle = '#00FF00';  // Enemy color
            context.fillRect(this.x, this.y, this.width, this.height);
        }
    };
    enemies.push(enemy);
}

function checkCollisions() {
    // Check if player collides with any enemy
    for (let i = 0; i < enemies.length; i++) {
        let enemy = enemies[i];
        if (player.x < enemy.x + enemy.width &&
            player.x + player.width > enemy.x &&
            player.y < enemy.y + enemy.height &&
            player.y + player.height > enemy.y) {
            gameOver();  // Trigger game over if player touches an enemy
        }
    }
}

function gameOver() {
    alert("Game Over!");
    gameStarted = false;  // Stop the game
    enemies = [];  // Clear enemies
    generateCoins(totalCoins);  // Regenerate coins
    score = 0;  // Reset the score
    player.x = 100;  // Reset player position
    player.y = 100;
}

function update() {
    player.x += player.speedX;
    player.y += player.speedY;

    if (player.x + player.width < 0) player.x = canvas.width; // Left to right
    if (player.x > canvas.width) player.x = -player.width;  // Right to left
    if (player.y + player.height < 0) player.y = canvas.height; // Top to bottom
    if (player.y > canvas.height) player.y = -player.height; // Bottom to top

    // Update enemies
    for (let enemy of enemies) {
        enemy.moveTowardsPlayer();
    }

    // Check if player collects a coin
    for (let i = coins.length - 1; i >= 0; i--) {
        let coin = coins[i];
        if (player.x < coin.x + coin.width &&
            player.x + player.width > coin.x &&
            player.y < coin.y + coin.height &&
            player.y + player.height > coin.y) {
            // Coin is collected, remove it from the array
            coins.splice(i, 1);
            spawnEnemy(); // Add a new enemy when a coin is collected
            score++;  // Increase score
        }
    }

    // If all coins are collected, regenerate them
    if (coins.length === 0) {
        generateCoins(totalCoins); // Regenerate the coins
    }

    checkCollisions(); // Check for player-enemy collisions
}

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

        context.fillStyle = '#002D04'; // Coin color
        for (let i = 0; i < coins.length; i++) {
            let coin = coins[i];
            context.fillRect(coin.x, coin.y, coin.width, coin.height);
        }

        // Draw enemies
        for (let enemy of enemies) {
            enemy.draw(context);
        }

        // Draw the score in the top-right corner
        context.font = "30px Arial";
        context.fillStyle = '#FFFFFF';  // White color for score
        context.fillText("Score: " + score, canvas.width - 150, 50);  // Position score
    }
}

// Handle player movement
function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        player.speedX = 5;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        player.speedX = -5;
    } else if (e.key == "Up" || e.key == "ArrowUp") {
        player.speedY = -5;
    } else if (e.key == "Down" || e.key == "ArrowDown") {
        player.speedY = 5;
    }
}

function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight" || e.key == "Left" || e.key == "ArrowLeft") {
        player.speedX = 0;
    }
    if (e.key == "Up" || e.key == "ArrowUp" || e.key == "Down" || e.key == "ArrowDown") {
        player.speedY = 0;
    }
}

function gameLoop(timeStamp) {
    update();
    draw();
    window.requestAnimationFrame(gameLoop);
}
