var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

// c.fillStyle = 'rgba(250,0,0,0.5)';
// c.fillRect(100,100,100,100);
// c.fillRect(300,200,300,100);
// c.fillStyle = 'rgba(23,14,100,0.5)';
// c.fillRect(300,200,300,100);


// // Line
// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 100)

// c.strokeStyle = "#fa34a3";
// c.stroke();



// for (var i = 0; i < 100; i++) {
//     c.beginPath();
//     c.arc(Math.random() * window.innerWidth, Math.random()*window.innerHeight, 30, 0, Math.PI * 2,false);e
//     c.strokeStyle = 'blue';
//     c.stroke();
// }


// c.beginPath();
// c.arc(200, 200, 30, 0, Math.PI * 2,false);
// c.strokeStyle = 'blue';
// c.stroke();

var mouse = {
    x: undefined,
    y: undefined
}

var maxRadius = 40;
// var minRadius = 2;

var colorArray = [
    '#355070',
    '#6D597A',
    '#B56576',
    '#E56B6F',
    '#EAAC8B',
];

window.addEventListener('resize', 
    function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

window.addEventListener('mousemove', 
    function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    // console.log(mouse);
});


function Circle(x, y, dx, dy, radius,minRadius) {

    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    this.minRadius = radius;
    

    this.draw = function(){

        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2,false);

        c.strokeStyle = 'blue';
        c.stroke();
        c.fillStyle =  this.color;
        c.fill();
        
    }
    this.update = function(){

            if (this.x+this.radius > innerWidth || this.x-this.radius < 0){
                this.dx=-this.dx;
            }

            if (this.y+this.radius > innerHeight || this.y-this.radius < 0){
                this.dy=-this.dy;
            }

            this.x += this.dx;
            this.y += this.dy;

            // interactivity

            if (mouse.x - this.x < 50 && mouse.x - this.x > -50 
                && mouse.y -this.y < 50 && mouse.y -this.y > -50) {
                    if(this.radius < maxRadius){
                        this.radius += 1;
                    }
            }
            else if (this.radius > this.minRadius){
                this.radius -= 1;
            }


            this.draw();
    } 

}



var circleArray = [];



function init(){
    circleArray = []
    for (var i = 0; i < 800; i++){

        var radius = Math.random()*3 + 2;
        var x = Math.random() * (innerWidth - radius*2) +radius;
        var y = Math.random() * (innerHeight - radius*2) + radius;
        var dx = (Math.random() - 0.5) * 4;
        var dy = (Math.random() - 0.5) * 4;
        
        circleArray.push(new Circle(x, y, dx, dy, radius));
    }
}

function animate(){
    requestAnimationFrame(animate);

    c.clearRect(0, 0, innerWidth, innerHeight);

    for(var i = 0; i < circleArray.length; i++){
        circleArray[i].update();
    }

}

init();
animate();

