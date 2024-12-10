function keyDownHandler(event){
    if (event.key === 'd') {
        player.speedX = 3;
    }
    if (event.key === 'a') {
        player.speedX = -3;   

    }
    if (event.key === 'w') {     
        player.speedY = -3;
    }
    if (event.key === 's') {  // Crouch
        player.speedY = 3;
    }
}

function keyUpHandler(event){
    if (event.key === 'd' || event.key === 'a') {
        player.speedX = 0;
    }

    if (event.key === 'w' || event.key === 's') {
        player.speedY = 0;
    }
}