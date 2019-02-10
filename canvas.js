var canvas =document.querySelector('canvas');
console.log(canvas);
canvas.width = window.innerWidth;
canvas.height= window.innerHeight;
var ctx=canvas.getContext('2d');
w=canvas.width;
h=canvas.height;
// ctx.fillStyle='rgba(255,255,0,0.5)';
// ctx.fillRect(w/2-5,h/2-5,10,10);

// //line
// ctx.beginPath();
// ctx.moveTo(10,10);

// ctx.lineTo(w/2-5,h/2-5);
// ctx.lineTo(w/2-5+10,h/2-5);
// ctx.lineTo(w-10,10);

// ctx.moveTo(w/2-5+10,h/2-5);
// ctx.lineTo(w/2-5+10,h/2-5+10);
// ctx.lineTo(w-10,h-10);

// ctx.moveTo(w/2-5+10,h/2-5+10);
// ctx.lineTo(w/2-5,h/2-5+10);
// ctx.lineTo(10,h-10);

// ctx.moveTo(w/2-5,h/2-5+10);
// ctx.lineTo(w/2-5,h/2-5+10-10);

// ctx.strokeStyle= 'rgba(255,0,0,0.5)';
// ctx.stroke();

// ctx.beginPath();
// ctx.arc(w/2,h/2,15,0*Math.PI/180,360*Math.PI/180,true);
// ctx.stroke();


// ctx.beginPath();
// ctx.arc(w/2,h/2,25,0*Math.PI/180,360*Math.PI/180,true);
// ctx.stroke();


// for (var i=0;i<100;i++){
//     ctx.beginPath();
//     ctx.arc(Math.random()*w, Math.random()*h,25,0*Math.PI/180,360*Math.PI/180,true);
//     var r=Math.random()*255;
//     var g=Math.random()*255;
//     var b=Math.random()*255;
    
//     ctx.strokeStyle= "rgba("+r+","+g+","+b+",1)";
//     ctx.stroke();
    
// }

// ctx.beginPath();
// ctx.arc(w/2,h/2,15,0*Math.PI/180,360*Math.PI/180,true);
// ctx.strokeStyle="blue";
// ctx.stroke();
var mouse={
    x:undefined,
    y:undefined
}

window.addEventListener('mousemove',
function(event){
    mouse.x=event.x;
    mouse.y=event.y;
    
})

class Circle {
    constructor(x, dx, y, dy, radius, r, g, b) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.red = r;
        this.green = g;
        this.blue = b;
        this.minRadius = 0.2 * radius;
        this.maxRadius = 3 * radius;
    }
    draw ()
    {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0 * Math.PI / 180, 360 * Math.PI / 180, true);
        ctx.strokeStyle = "rgba(" + this.red + "," + this.green + "," + this.blue + ",1)";
        ctx.stroke();
        ctx.fillStyle="rgba(" + this.red + "," + this.green + "," + this.blue + ",0.5)";
        ctx.fill();
    }
    update () 
    {
        if (this.x + this.radius >= innerWidth || this.x - this.radius <= 0) {
            this.dx = -1 * this.dx;
        }
        if (this.y + this.radius >= innerHeight || this.y - this.radius <= 0) {
            this.dy = -1 * this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;
        //interactivity
        var isTooClose = this.distance(mouse.x, mouse.y, this.x, this.y);
        if (isTooClose && this.radius <= this.maxRadius) {
            // this.radius=this.increasedRadius;
            this.radius += 1;
            console.log(isTooClose);
        }
        else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }
        this.draw();
    }
    distance(x1,y1,x2,y2){
        if(Math.abs(x1-x2)<50 && Math.abs(y1-y2)<50)
            return true;
        return false;    
    
    }
}






var circleArray=[];
var numberOfCircles=Math.ceil(0.001*innerHeight*innerWidth);
for (var i=0;i<numberOfCircles;i++)
{
    var radius=10;
    var x=Math.random()*(innerWidth-2*radius) +radius;  
    var dx=1*((Math.random()-0.5)<0?-1:1);
    var y=Math.random()*(innerHeight-2*radius)+radius;
    var dy=1*((Math.random()-0.5)>0?-1:1);
    var red=Math.random()*255;
    var green=Math.random()*255;
    var blue=Math.random()*255;
        

    circleArray.push(new Circle(x,dx,y,dy,radius,red,green,blue));

}





function animate(){

    
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,innerWidth,innerHeight);
    for(var i=0;i<circleArray.length;i++){
        circleArray[i].update();
    }

}    
    

    // for (var i=0;i<100;i++){
    //     ctx.beginPath();
    //     ctx.arc(Math.random()*w, Math.random()*h,25,0*Math.PI/180,360*Math.PI/180,true);
    //     var r=Math.random()*255;
    //     var g=Math.random()*255;
    //     var b=Math.random()*255;
        
    //     ctx.strokeStyle= "rgba("+r+","+g+","+b+",1)";
    //     ctx.stroke();
    // }




animate();

