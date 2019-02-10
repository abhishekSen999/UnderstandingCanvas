/*
this class draws and handels all functionalities concerned with each circle.
this includes conditional updation. 
*/
class Circle {
    constructor(x, dx, y, dy, radius, color) {
        this.x = x;
        this.y = y;
        this.dx = dx;//direction and speed of movement along x axis
        this.dy = dy;//direction and speed of movement along y axis
        this.radius = radius;
        // this.red = r;
        // this.green = g;
        // this.blue = b;
        this.color=color;
        
        this.minRadius = 0.2 * radius;//minimum radius is 20% of initial radius
        this.maxRadius = 3 * radius;//maximum radius is 300 % of initial radius
    }
    draw ()//draws the circle
    {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0 * Math.PI / 180, 360 * Math.PI / 180, true);
        ctx.strokeStyle = this.createRgbaString(this.color);
        ctx.stroke();
        ctx.fillStyle=this.createRgbaString(this.color);
        ctx.fill();
    }


    update () //does conditional updations
    {
        //circle movement
        //makes sure circle bounces off the edge
        if (this.x + this.radius >= innerWidth || this.x - this.radius <= 0) {
            this.dx = -1 * this.dx;
        }
        if (this.y + this.radius >= innerHeight || this.y - this.radius <= 0) {
            this.dy = -1 * this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;


        //interactivity with mouse pointer
        var isTooClose = this.isCircleTooClose(mouse.x, mouse.y, this.x, this.y);
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

    //returns whether the two points are too close(within 50 px) of eachother
    isCircleTooClose(x1,y1,x2,y2){
        if(Math.abs(x1-x2)<50 && Math.abs(y1-y2)<50)
            return true;
        return false;    
    
    }

    // convert {r,g,b,b} to rgba string
    createRgbaString(color) {
        return `rgba(${color.red},${color.green},${color.blue},${color.brightness})`;
    }

    
}


class Background{
    constructor(canvas,widthOfHexagon){
        var mapWindow=[][];
        var circleArray=[];

    }
}




