

var mouse={
    x:undefined,
    y:undefined
}

window.addEventListener('mousemove',
function(event){
    mouse.x=event.x;
    mouse.y=event.y;
    
});




/*
this class draws and handels all functionalities concerned with each circle.
this includes conditional updation. 
*/



class Circle {

    /** 
    * @param x: x-coordinate of the circle
    *
    */
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
        this.minBrightness=0.2;
        this.maxBrightness=1;

        this.adjoiningCircles=[undefined,undefined,undefined];

    }
    setLocation(x,y){
        this.x = x;
        this.y = y;
    }
    getX(){
        return this.x;
    }
    getY(){
        return this.y;
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
        // if (this.x + this.radius >= innerWidth || this.x - this.radius <= 0) {
        //     this.dx = -1 * this.dx;
        // }
        // if (this.y + this.radius >= innerHeight || this.y - this.radius <= 0) {
        //     this.dy = -1 * this.dy;
        // }
        // this.x += this.dx;
        // this.y += this.dy;


        //interactivity with mouse pointer
        var isTooClose = this.isCircleTooClose(mouse.x, mouse.y, this.x, this.y);
        if (isTooClose && this.color.brightness <= this.maxBrightness) {
            // this.radius=this.increasedRadius;
            this.color.brightness += 0.1;
            console.log(isTooClose+"  dotx: "+this.x+"  doty: "+this.y+"    mousex: "+mouse.x+"   mousey: "+mouse.y);
        }
        else if (!isTooClose && this.color.brightness > this.minBrightness) {
            this.color.brightness -= 0.1;
        }
        this.draw();
    }

    //returns whether the two points are too close(within 50 px) of eachother
    isCircleTooClose(x1,y1,x2,y2){
        if(Math.abs(x1-x2)<20 && Math.abs(y1-y2)<20)
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

        this.canvas=canvas;
        this.canvas.width = window.innerWidth;
        this.canvas.height= window.innerHeight;
        this.widthOfHexagon=widthOfHexagon;//(d in explanation)
        this.sideOfHexagon=Math.floor(this.widthOfHexagon/Math.sqrt(3));//(s in explanation)
        this.radius=3;//px
        this.circleArray=[];
        this.colorScheme={red:255,green:255,blue:255,brightness:0.2};
        this.closenessFactor=1.5;
        
    }
    init(){
        //initiating the graph whose elements will be stored in circleArray
        var mapWindow=[];//2d array implimentation
        
        //no of dots in x axis
        var xDimAxis=Math.ceil(window.innerWidth /(this.widthOfHexagon)*this.closenessFactor);
        //no of dots in y axis
        var yDimAxis=Math.ceil(window.innerHeight /(this.sideOfHexagon));
        //declaring 2d array od desired dimension with undefined
        for(var i=0;i<yDimAxis;i++){
            mapWindow[i]=[];
            for(var j=0;j<xDimAxis;j++){
                mapWindow[i][j]=undefined;
            }
        }

        
        //calculating no of circles required to fill the screen
        //calculation logic explained separately.
        var noOfRequiredDots= (Math.ceil(xDimAxis/2)*2+Math.floor(xDimAxis/2)*2)*(Math.floor(yDimAxis/4));
        if (yDimAxis % 4==1)
            noOfRequiredDots+=Math.ceil(xDimAxis/2);
        else if(yDimAxis % 4==2)
            noOfRequiredDots+=Math.ceil(xDimAxis/2)*2;
        else if(yDimAxis%4==3)
            noOfRequiredDots+=Math.ceil(xDimAxis/2)*2+Math.floor(xDimAxis/2);
        

        //fill circleArray with calculated number of circles
        this.fillCircleArray(noOfRequiredDots,this.radius,this.colorScheme);
        //console.log(this.circleArray.length);
        this.mapCircleOnWindow(xDimAxis,yDimAxis);

    }


    fillCircleArray(noOfRequiredDots,radius,colorScheme){
        for(var i=0;i<noOfRequiredDots;i++){
            this.circleArray.push(new Circle(radius,0,radius,0,radius,colorScheme))// initially all the circles are located at the top right corner of the screen.
        }
    }

    /**
     * @param xDimAxis : the x axis length on window
     * @param yDimAxis : the y axis length on window 
     */
    mapCircleOnWindow(xDimAxis,yDimAxis){
        
        //initiating the graph whose elements will be stored in circleArray
        var mapWindow=[];//2d array implimentation
        
        
        //declaring 2d array od desired dimension with undefined
        for(var i=0;i<yDimAxis;i++){
            mapWindow[i]=[];
            for(var j=0;j<xDimAxis;j++){
                mapWindow[i][j]=undefined;
            }
        }
    

        /**
         *          the following map will be drawn in the matrix and 
         *          (x,y) coordinates will be assigned accordingly
         *          *- the circle(dot) on screen
         *          .-space in the matrix
         * 
         *          * . * . * . * . * . * . * . * .             #0
         *          * . * . * . * . * . * . * . * .             #1
         *          . * . * . * . * . * . * . * . *             #2
         *          . * . * . * . * . * . * . * . *             #3
         *          * . * . * . * . * . * . * . * .             #0
         *          * . * . * . * . * . * . * . * .             #1
         *            *   *   *   *   *   *   *   *             #2
         *            *   *   *   *   *   *   *   *             #3
         *          *   *   *   *   *   *   *   *               #0
         *          *   *   *   *   *   *   *   *               #1
         *            *   *   *   *   *   *   *   *             #2
         *            *   *   *   *   *   *   *   *             #3
         
        */

        var indexCircleArray=0; 
        var repeatAfter=4;
        
        //filling up the 2d array 
        for (var row=0;row<yDimAxis;row+=repeatAfter){
            for (col=0;col<xDimAxis;col+=2){
                if(row<yDimAxis){  // checking for last set of 4 (particular condition is redundant given for uniformity)
                    mapWindow[row][col]=this.circleArray[indexCircleArray++];   // filling #0
                }
                if(row+1<yDimAxis){// checking for last set of 4  
                    mapWindow[row+1][col]=this.circleArray[indexCircleArray++]; // filling #1
                }
            }
            for (col=1;col<xDimAxis;col+=2){
                if(row+2<yDimAxis){// checking for last set of 4
                    mapWindow[row+2][col]=this.circleArray[indexCircleArray++]; // filling #2
                }
                if(row+3<yDimAxis){// checking for last set of 4
                    mapWindow[row+3][col]=this.circleArray[indexCircleArray++]; // filling #3
                }
            }
        }
        

        //relation of x,y with row and col of mapWindow[][] 
        for(var row=0;row<yDimAxis;row++){
            for(var col=0;col<xDimAxis;col++){
                if(mapWindow[row][col]!=undefined){
                    mapWindow[row][col].x=this.widthOfHexagon*col/this.closenessFactor;
                    mapWindow[row][col].y=this.sideOfHexagon*row;
                }
            }
        }

        console.log(mapWindow);

    }

        
    

}


var canvas=document.getElementById('canvas');
var ctx=canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height= window.innerHeight;
var widthOfHexagon=50;//px
var background=new Background(canvas,widthOfHexagon)
background.init();
function animate(){
    
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,innerWidth,innerHeight);
    for(var i=0;i<background.circleArray.length;i++){
        background.circleArray[i].update();
    }

}

animate();




