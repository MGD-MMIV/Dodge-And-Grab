let player = {
    x: 400,
    y: 300,
    height: 50,
    width: 50, 
    speedX:0,
    speedY:0,
    draw: function(context){
        context.fillStyle = 'gold';
        context.fillRect(player.x,player.y,player.width,player.height);
    },
    

};

let camera = { 
    x: player.x - 400 + player.width / 2,
    y: player.y - 300 + player.height / 2,
    update: function() { 
    camera.x = player.x - 400 + player.width / 2; 
    camera.y = player.y - 300 + player.height / 2; } 
    };