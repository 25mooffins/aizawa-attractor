var width;
var height;

const a = 0.95;
const b = 0.7;
const c = 0.6;
const d = 3.5;
const e = 0.25;
const f = 0.1;

var dt = 0.03;
let array = [[]];
var numberOfLines = 10;
var scaleFactor = 40;
var maxPoints = 500;

const rotateSpeed = 0.01;
var currentAngle = 0;
class p{

    constructor(x, y, z){
        this.x = x;
        this.y = y;
        this.z = z;
    }
    scale(scale){
        return new p(this.x * scale, this.y * scale, this.z * scale);
    }
}

function setup(){
    width = window.innerWidth-10;
    height = window.innerHeight-10;
    createCanvas(width, height, WEBGL);

    // debugMode();
    frameRate(60);
    background(0);
    
    for(let number = 0; number < numberOfLines; number++){
        array.push([]);
    }
    for(let number = 0; number < numberOfLines; number++){
        
        var point = new p(number/(numberOfLines*1.1),0,0);
        array[number].push(point);
    }
    

    
    
    
}

function draw(){
    strokeWeight(0.5);
    orbitControl();


    // currentAngle+=rotateSpeed;
    // if(currentAngle>=360){
    //     currentAngle = 0;
    // }
    // rotateY(currentAngle);
    // rotateX(currentAngle);
    // rotateZ(currentAngle);
    rotateX(60*Math.PI/180);
    rotateZ(90*Math.PI/180);

    for(let number = 0; number < numberOfLines; number++){
        if(array[number].length >= maxPoints){
            array[number].shift();
        }
        var lastElementOfArray = array[number].length-1;
        var p = aizawa(array[number][lastElementOfArray]);
        array[number].push(p);
    }
    
    
    noFill();

    clear();
    
    const zAdjust = 0;
    for(let number = 0; number < numberOfLines; number++){
        
        beginShape();
        for(let i = 0; i < array[number].length; i++){
            var displayPoint = array[number][i].scale(scaleFactor);
            var color = i*255/array[number].length;
            stroke(color*1.2, color+100, color*0.5);
            vertex(displayPoint.x, displayPoint.y, displayPoint.z - zAdjust);
            if(i == array[number].length-1){
                strokeWeight(7);
                stroke(189, 113, 0);
                point(displayPoint.x, displayPoint.y, displayPoint.z);
            }
            strokeWeight(0.5);            
        }
        endShape(); 
    }
    
    // debug to find zAdjust
    // strokeWeight(2);
    // stroke('pink');
    // translate(0,0,-260); 
    // sphere(10);

    
    
}

function aizawa(point){
    var x = point.x;
    var y = point.y;
    var z = point.z;

    var dx = (-d * y + x*(-b+z))*dt;
    var dy = (d*x + y*(-b+z))*dt;
    var dz = (a*z+c+f*x**3*z - z**3/3 - (x**2 + y**2)*(e*z + 1))*dt;

    return new p(x+dx, y+dy, z+dz);
}
