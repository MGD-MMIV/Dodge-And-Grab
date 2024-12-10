
let player = {
    x: 100,
    y: 100,
    width: 50,
    height: 50,
    speedX: 0,
    speedY: 0,
    draw: function(context) {
        context.fillStyle = '#FF0000';  // Player color
        context.fillRect(this.x, this.y, this.width, this.height);
    }
};