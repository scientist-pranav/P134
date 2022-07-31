img = "";
status = "";
objectdetector = "";
objects = [];
function preload() {
}

function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(640, 420);
    video.hide();
}

function modelLoaded() {
    console.log("Model is Loaded")
    status = true;
    objectdetector.detect(video, gotResult)
}
function gotResult(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        objects = results;
    }
} 

function draw() {
    image(video, 0, 0, 640, 420);
    if (status!="") {
        r = random(255);
        g = random(255);
        b = random(255);
        objectdetector.detect(video, gotResult);
        for (index = 0; index < objects.length; index++) {
            document.getElementById("status").innerHTML = "status: object is detected";
            document.getElementById("number_of_objects").innerHTML = "number_of_objects: " + objects.length;
            fill(r, g, b);
            percent = floor(objects[index].confidence*100);
            text(objects[index].label+" "+percent+"%", objects[index].x, objects[index].y);
            noFill()
            stroke(r, g, b);
            rect(objects[index].x, objects[index].y, objects[index].width, objects[index].height);

            
        }
    }
}

function start() {
    objectdetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "status: detecting objects";
}