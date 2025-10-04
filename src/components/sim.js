//Setting Up Canvas

import rk2 from './computers.js'


let circleCanvas = document.getElementById("space-circles");
let lineCanvas = document.getElementById("space-line-background");

var circleCanvasContext = circleCanvas.getContext('2d');
var lineCanvasContext = lineCanvas.getContext('2d');

var window_width = window.innerWidth;
var window_height= window.innerHeight;

circleCanvas.style.background= "transparent";
lineCanvas.style.background= "#000000";


lineCanvas.width=window_width*1;
lineCanvas.height=window_height*1;
circleCanvas.width=window_width*1;
circleCanvas.height=window_height*1;

circleCanvas.lineWidth=2;

//Locating Canvas Origin
var originX = lineCanvas.width/2;
var originY = lineCanvas.height/2;

// Converting Coordinates with Pixels: 1x=150px

//All Objects
let bodies = [];
let scale=300;
const G=1;
let i=5;
let colorScheme = [
  {
    body1: "red",
    body2: "green",
    body3: "blue"
  },
  {
    body1: "#00FFC5", // Aqua Mint
    body2: "#FF3CAC", // Neon Pink
    body3: "#845EC2"  // Electric Purple
  },
  {
    body1: "#FFB86F", // Peach
    body2: "#8BE9FD", // Soft Cyan
    body3: "#BD93F9"  // Lavender
  },
  {
    body1: "#A0522D", // Sienna
    body2: "#228B22", // Forest Green
    body3: "#4682B4"  // Steel Blue
  },
  {
    body1: "#FF0000", // Pure Red
    body2: "#00FF00", // Pure Green
    body3: "#00BFFF"  // Deep Sky Blue
  },
  {
    body1: "#FFFF00", // Yellow (bright!)
    body2: "#00FFFF", // Cyan
    body3: "#FF00FF"  // Magenta
  },
  {
    body1: "#FF4500", // OrangeRed
    body2: "#7CFC00", // LawnGreen
    body3: "#1E90FF"  // Dodger Blue
  },
  {
    body1: "white", // OrangeRed
    body2: "white", // LawnGreen
    body3: "white" 
  }
];

//Defining and Drawing Our Body
class Body {
    constructor(x,y,vx,vy,m,radius,color){
        this.x = x;
        this.y = y;
        this.vx=vx;
        this.vy=vy;
        this.ax=0;
        this.ay=0;
        this.m=m;
        this.radius = radius;
        this.color = color;
        this.oldx=x;
        this.oldy=y;

    }

    drawCircle (context){
        let xpos= originX+this.x*scale;
        let ypos = originY+this.y*scale;
        context.beginPath();
        context.strokeStyle = this.color;
        context.fillStyle = this.color;
        context.arc(xpos, ypos, this.radius, 0, Math.PI*2, false);
        context.stroke();
        context.fill();
    }

    drawSmallCircle (context){
        let xpos= originX+this.x*scale;
        let ypos = originY+this.y*scale;
        context.beginPath();
        context.strokeStyle = this.color;
        context.fillStyle = this.color;
        context.arc(xpos, ypos, 0.6, 0, Math.PI*2, false);
        context.stroke();
        context.fill();

    }
    // drawLine (context){
    //     let xpos= originX+this.x*scale;
    //     let ypos = originY+this.y*scale;
    //     let oldxpos= originX+this.oldx*scale;
    //     let oldypos= originY+this.oldy*scale;
    //     lineCanvasContext.beginPath();
    //     lineCanvasContext.moveTo(oldxpos,oldypos);
    //     lineCanvasContext.lineTo(xpos,ypos);
    //     lineCanvasContext.strokeStyle=this.color;
    //     lineCanvas.lineWidth=5;
    //     lineCanvasContext.stroke();
    // }


   
    drawVelocityVector(context){
        let xpos= originX+this.x*scale+this.radius*0.8;
        let ypos = originY+this.y*scale+this.radius*0.80;
        context.beginPath();
        context.moveTo(xpos,ypos);
        let xpos2=xpos+this.vx*scale+this.radius;
        let ypos2=ypos+this.vy*scale+this.radius;
        context.lineTo(xpos2,ypos2);
        context.strokeStyle=this.color;
        context.stroke();
           
    }
    

}

const viewportTransform = {
      x: 0,
      y: 0,
      scale: 1
    }



//lagrenge

bodies = [
  new Body(1, 0, 0, -0.6, 1, 5, colorScheme[i].body1),                // Body 1
  new Body(-0.5, 0.86602540378, 0.51961524227, 0.3, 1, 7, colorScheme[i].body2),  // Body 2
  new Body(-0.5, -0.86602540378, -0.51961524227, 0.3, 1, 7, colorScheme[i].body3) // Body 3
];

// fig 8
// bodies = [
//   new Body(0.97000436, -0.24308753, 0.4662036850, 0.4323657300, 1, 5, colorScheme[i].body1),
//   new Body(-0.97000436, 0.24308753, 0.4662036850, 0.4323657300, 1, 7, colorScheme[i].body2),
//   new Body(0.0, 0.0, -0.93240737, -0.86473146, 1, 7, colorScheme[i].body3)
// ];

// rotaing fig 8
// bodies = [
//   new Body(0.97000436, -0.25308753, 0.4662036850, 0.4323657300, 1, 5, colorScheme[i].body1),
//   new Body(-0.97000436, 0.24308753, 0.4662036850, 0.4323657300, 1, 7, colorScheme[i].body2),
//   new Body(0.0, 0.0, -0.93240737, -0.86473146, 1, 7, colorScheme[i].body3)
// ];

//butterfly
// bodies = [
//   new Body(-1, 0, 0.306893, 0.125507, 1, 5, colorScheme[i].body1),  // Body A
//   new Body(1, 0, 0.306893, 0.125507, 1, 7, colorScheme[i].body2),   // Body B
//   new Body(0, 0, -0.613786, -0.251014, 1, 7, colorScheme[i].body3)  // Body C
// ];

//bodies 2

// bodies = [
//   new Body(-1, 0, 0.392955, 0.097579, 1, 5, colorScheme[i].body1),   // Body A
//   new Body(1, 0, 0.392955, 0.097579, 1, 7, colorScheme[i].body2),    // Body B
//   new Body(0, 0, -0.78591, -0.195158, 1, 7, colorScheme[i].body3)    // Body C
// ];









let dt = 0.0001;
let stepsPerFrame = 300;


//Animating
let RunSim = function(){

    requestAnimationFrame(RunSim);
    circleCanvasContext.clearRect(0,0,window_width*1.5, window_height*1.5);
  
    // Run physics multiple times per frame
    for (let i = 0; i < stepsPerFrame; i++) {
         rk2(bodies, dt);
        //  for (let body of bodies){
        //     body.drawLine(lineCanvasContext);
            
        //  }
    }

    //Redraw with Updated x.
    for (let body of bodies) {
        body.drawSmallCircle(lineCanvasContext);        
        body.drawCircle(circleCanvasContext);
        // body.drawVelocityVector(circleCanvasContext);
    }


}

RunSim();


